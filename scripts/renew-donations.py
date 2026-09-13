#!/usr/bin/env python3
"""Invoke the authenticated renewal job from the server's service timer.

Usage: python3 scripts/renew-donations.py --env-file /private/path/.env.runtime
Never prints credentials or donor records. A failure exits nonzero for monitoring.
"""
import argparse
import json
import pathlib
import sys
import urllib.error
import urllib.request

parser = argparse.ArgumentParser()
parser.add_argument("--env-file", required=True)
args = parser.parse_args()
values = {}
for line in pathlib.Path(args.env_file).read_text().splitlines():
    key, separator, value = line.partition("=")
    if separator and not key.startswith("#"):
        values[key.strip()] = value.strip().strip("\"'")
secret = values.get("DONATION_RENEWAL_SECRET")
if not secret:
    sys.exit("Renewal authentication is not configured.")
request = urllib.request.Request(
    "https://www.nivaranfoundation.org/api/donate/renew",
    data=b"{}",
    headers={"Authorization": "Bearer " + secret, "Content-Type": "application/json"},
    method="POST",
)
try:
    with urllib.request.urlopen(request, timeout=300) as response:
        result = json.load(response)
    print(json.dumps({k: result[k] for k in ("processed", "failed", "needsReview", "enabled") if k in result}))
except urllib.error.HTTPError as error:
    print("Monthly renewal job needs attention (HTTP %s). Check the private payment journal; do not retry uncertain charges." % error.code)
    sys.exit(1)
except Exception:
    sys.exit("Could not confirm renewal job completion. Check the private payment journal before taking action.")
