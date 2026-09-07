"""Publish the active S4 placement stage; historical AGBM-02 files stay on GitHub.

tsci push does not honor package.json's files field and the registry rejects
the original PCB with HTTP 413. Use an explicit, reviewable package boundary.
"""
from pathlib import Path
import shutil
import subprocess
import tempfile
import re
import json

project_dir = Path(__file__).resolve().parents[1]
package_files = [
    "package.json", "tsconfig.json", "tscircuit.config.json", "LICENSE.md", "bun.lock",
]
with tempfile.TemporaryDirectory(prefix="s4-tsci-package-") as package_directory:
    package_dir = Path(package_directory)
    for relative_path in package_files:
        shutil.copy2(project_dir / relative_path, package_dir / relative_path)
    shutil.copytree(project_dir / "s4", package_dir / "s4")
    (package_dir / "scripts").mkdir()
    for script in (project_dir / "scripts").glob("*s4*"):
        if script.is_file():
            shutil.copy2(script, package_dir / "scripts" / script.name)
    (package_dir / "index.circuit.tsx").write_text(
        'export { default } from "./s4/power-core.circuit"\n')
    (package_dir / "README.md").write_text(
        "# T113-S4 console — placement stage\n\n"
        "112 components, six schematic sheets, routing disabled. "
        "This is an incomplete console, not a fabrication release.\n\n"
        "See [S4 design notes](s4/README.md), [blockers](s4/BLOCKERS.md), "
        "[parts table](s4/JLCPCB-PARTS.md) and [interface review](s4/INTERFACE-REVIEW.md). "
        "The historical Nintendo design remains in "
        "[GitHub](https://github.com/AnasSarkiz/Game-Boy-Enhance).\n")
    shutil.copy2(project_dir / "s4/BLOCKERS.md", package_dir / "BLOCKERS.md")
    registry_package = json.loads((package_dir / "package.json").read_text())
    registry_package["main"] = "index.circuit.tsx"
    registry_package["description"] = "T113-S4 console: USB recovery, SD storage and game inputs; routing-disabled placement stage"
    registry_package["scripts"] = {name: command for name, command in registry_package["scripts"].items()
                                   if ":s4:" in name or name == "typecheck"}
    registry_package["scripts"].update({"dev": "tsci dev index.circuit.tsx", "build": "bun run build:s4:core"})
    (package_dir / "package.json").write_text(json.dumps(registry_package, indent=2) + "\n")
    # Check the actual packaged entrypoint before publishing; dependencies are not uploaded.
    (package_dir / "node_modules").symlink_to(project_dir / "node_modules", target_is_directory=True)
    for arguments in [["check", "netlist", "index.circuit.tsx"],
                      ["check", "placement", "index.circuit.tsx"],
                      ["build", "index.circuit.tsx", "--routing-disabled", "--disable-parts-engine"]]:
        subprocess.run(["tsci", *arguments], cwd=package_dir, check=True, stdout=subprocess.DEVNULL)
    compiled = json.loads((package_dir / "dist/index/circuit.json").read_text())
    diagnostics = [entry for entry in compiled if entry["type"].endswith(("_error", "_warning"))]
    if diagnostics:
        raise ValueError(f"Packaged entrypoint has unresolved diagnostics: {diagnostics}")
    assert len([entry for entry in compiled if entry["type"] == "pcb_component"]) == 112
    assert not any(entry["type"] in ["pcb_trace", "pcb_via"] for entry in compiled)
    (package_dir / "node_modules").unlink()
    print("Validated packaged S4 entrypoint: 112 components, routing disabled, no diagnostics", flush=True)
    process = subprocess.Popen(["tsci", "push", "index.circuit.tsx"], cwd=package_dir,
        stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    for line in process.stdout:
        if re.search(r"authorization|bearer", line, re.IGNORECASE):
            print("[authentication header redacted]", flush=True)
        else:
            print(re.sub(r"eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+", "[credential redacted]", line), end="", flush=True)
    return_code = process.wait()
    if return_code:
        raise SystemExit(return_code)
    local_package = json.loads((project_dir / "package.json").read_text())
    local_package["version"] = json.loads((package_dir / "package.json").read_text())["version"]
    (project_dir / "package.json").write_text(json.dumps(local_package, indent=2) + "\n")
