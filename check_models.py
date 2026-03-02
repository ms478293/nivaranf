#!/usr/bin/env python3
import json, urllib.request, os

key = os.getenv("GEMINI_API_KEY", "")
if not key:
    for f in [".env.local", ".env"]:
        try:
            for line in open(f):
                if line.strip().startswith("GEMINI_API_KEY="):
                    key = line.strip().split("=", 1)[1].strip().strip('"').strip("'")
                    break
        except Exception:
            pass
        if key:
            break

if not key:
    print("NO GEMINI_API_KEY found")
    exit(1)

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={key}"
req = urllib.request.Request(url)
with urllib.request.urlopen(req, timeout=20) as resp:
    data = json.loads(resp.read())

print("=== IMAGE-CAPABLE MODELS ===")
for m in data.get("models", []):
    name = m.get("name", "")
    methods = m.get("supportedGenerationMethods", [])
    desc = m.get("description", "").lower()
    display = m.get("displayName", "").lower()
    haystack = name.lower() + " " + desc + " " + display
    if "image" in haystack or "imagen" in haystack:
        print(f"  {name}  methods={methods}")

print("\n=== ALL generateContent MODELS ===")
for m in data.get("models", []):
    methods = m.get("supportedGenerationMethods", [])
    if "generateContent" in methods:
        name = m.get("name", "")
        display = m.get("displayName", "")
        print(f"  {name}  ({display})")
