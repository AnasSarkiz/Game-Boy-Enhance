"""Publish the runnable package; the 16 MB KiCad reference stays on GitHub.

tsci push does not honor package.json's files field and the registry rejects
the original PCB with HTTP 413. Use an explicit, reviewable package boundary.
"""
from pathlib import Path
import shutil
import subprocess
import tempfile
import re

project_dir = Path(__file__).resolve().parents[1]
package_files = [
    "package.json", "index.circuit.tsx", "tsconfig.json", "tscircuit.config.json",
    "README.md", "BLOCKERS.md", "JLCPCB-BLOCKERS.md", "LICENSE.md", "bun.lock",
]
with tempfile.TemporaryDirectory(prefix="agbm-tsci-package-") as package_directory:
    package_dir = Path(package_directory)
    for relative_path in package_files:
        shutil.copy2(project_dir / relative_path, package_dir / relative_path)
    for relative_directory in ["imports", "lib", "scripts"]:
        shutil.copytree(project_dir / relative_directory, package_dir / relative_directory)
    (package_dir / "reports").mkdir()
    for report_name in ["current-status.json", "reference-connectivity.csv", "release-check.log"]:
        shutil.copy2(project_dir / "reports" / report_name, package_dir / "reports" / report_name)
    (package_dir / "docs").mkdir()
    for document in (project_dir / "docs").glob("*.md"):
        shutil.copy2(document, package_dir / "docs" / document.name)
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
    shutil.copy2(package_dir / "package.json", project_dir / "package.json")
