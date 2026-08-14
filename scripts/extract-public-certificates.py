"""Extract only the approved public certificate projection from a pg_dump archive.

Dependencies: pgdumplib==4.0.0 and zstandard==0.25.0.
The output never includes email, notes, revoked reason, user IDs or file paths.
"""

from __future__ import annotations

import argparse
import io
import json

import pgdumplib
import zstandard
from pgdumplib import constants
from pgdumplib.dump import Dump


def enable_zstd() -> None:
    if constants.COMPRESSION_ZSTD not in constants.SUPPORTED_COMPRESSION_ALGORITHMS:
        constants.SUPPORTED_COMPRESSION_ALGORITHMS.append(constants.COMPRESSION_ZSTD)
    original = Dump._read_data_compressed

    def read_compressed(archive: Dump) -> bytes:
        if archive.compression_algorithm != constants.COMPRESSION_ZSTD:
            return original(archive)
        if archive._handle is None:
            raise ValueError("Archive handle is not initialized")
        output = io.BytesIO()
        decompressor = zstandard.ZstdDecompressor().decompressobj()
        while True:
            chunk_size = archive._read_int()
            if not chunk_size:
                break
            chunk = archive._handle.read(chunk_size)
            output.write(decompressor.decompress(chunk))
            if chunk_size < constants.ZLIB_IN_SIZE:
                break
        return output.getvalue()

    Dump._read_data_compressed = read_compressed


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("backup", help="Authorized PostgreSQL custom-format backup")
    args = parser.parse_args()
    enable_zstd()
    dump = pgdumplib.load(args.backup)
    rows = []
    for values in dump.table_data("public", "verify_certificates"):
        if len(values) < 16:
            continue
        rows.append(
            {
                "verification_code": values[1],
                "student_name": values[2],
                "course_name": values[4],
                "batch_name": values[5],
                "issued_at": str(values[7]),
                "grade": values[8],
                "instructor_name": values[9],
                "status": values[11],
            }
        )
    print(json.dumps(rows, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
