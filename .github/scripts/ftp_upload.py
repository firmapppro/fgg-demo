#!/usr/bin/env python3
"""Upload a local folder to FTP. Used by GitHub Actions deploy workflows."""

from __future__ import annotations

import argparse
import os
import time
from ftplib import FTP
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", required=True)
    parser.add_argument("--remote", required=True)
    parser.add_argument("--skip-dir", action="append", default=[])
    parser.add_argument("--skip-suffix", action="append", default=[])
    return parser.parse_args()


class Client:
    def __init__(self) -> None:
        self.ftp: FTP | None = None
        self.connect()

    def connect(self) -> None:
        if self.ftp is not None:
            try:
                self.ftp.close()
            except Exception:
                pass
        ftp = FTP()
        ftp.connect(os.environ["FTP_SERVER"], 21, timeout=120)
        ftp.login(os.environ["FTP_USERNAME"], os.environ["FTP_PASSWORD"])
        ftp.set_pasv(True)
        ftp.encoding = "utf-8"
        self.ftp = ftp

    def ensure_dir(self, path: str) -> None:
        parts = [p for p in path.split("/") if p]
        current = ""
        for part in parts:
            current += "/" + part
            try:
                self.ftp.mkd(current)
            except Exception:
                pass

    def size(self, remote: str):
        try:
            return self.ftp.size(remote)
        except Exception:
            return None

    def store(self, local: Path, remote: str) -> str:
        last = None
        for attempt in range(1, 5):
            try:
                self.ensure_dir(str(Path(remote).parent).replace("\\", "/"))
                existing = self.size(remote)
                size = local.stat().st_size
                if existing == size:
                    return "skip"
                with local.open("rb") as fh:
                    self.ftp.storbinary(f"STOR {remote}", fh, blocksize=1024 * 256)
                return "ok"
            except Exception as exc:
                last = exc
                print(f"  retry {attempt}/4 {remote}: {exc}", flush=True)
                time.sleep(2 * attempt)
                self.connect()
        raise last


def collect(local: Path, skip_dirs: set[str], skip_suffixes: set[str]) -> list[Path]:
    files: list[Path] = []
    for path in local.rglob("*"):
        if not path.is_file() or path.name == ".DS_Store":
            continue
        if any(part in skip_dirs for part in path.relative_to(local).parts):
            continue
        if path.suffix.lower() in skip_suffixes:
            continue
        files.append(path)
    return sorted(files)


def main() -> None:
    args = parse_args()
    local = Path(args.local).resolve()
    remote_root = args.remote.rstrip("/")
    skip_dirs = set(args.skip_dir)
    skip_suffixes = {s.lower() if s.startswith(".") else f".{s.lower()}" for s in args.skip_suffix}
    files = collect(local, skip_dirs, skip_suffixes)
    client = Client()
    uploaded = skipped = 0
    t0 = time.time()
    print(f"upload {local} -> {remote_root} ({len(files)} files)", flush=True)
    for i, path in enumerate(files, 1):
        rel = path.relative_to(local).as_posix()
        remote = f"{remote_root}/{rel}"
        status = client.store(path, remote)
        if status == "skip":
            skipped += 1
        else:
            uploaded += 1
        print(f"[{i}/{len(files)}] {status} {rel}", flush=True)
    client.ftp.quit()
    print(
        f"done uploaded={uploaded} skipped={skipped} in {time.time() - t0:.0f}s",
        flush=True,
    )


if __name__ == "__main__":
    main()
