#!/usr/bin/env python3
"""Test which Gemini image models actually generate images."""
import json, urllib.request, base64, os, sys

API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyBLzQs0_7clCgaggSVPglUmQ4NrmWM3c54")

MODELS = [
    "gemini-2.0-flash-exp-image-generation",
    "gemini-2.5-flash-image",
    "gemini-3-pro-image-preview",
    "gemini-3.1-flash-image-preview",
]

PROMPT = "A simple blue sky with white clouds, photorealistic"

for model in MODELS:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={API_KEY}"
    payload = {
        "contents": [{"role": "user", "parts": [{"text": PROMPT}]}],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"],
            "temperature": 0.3,
        },
    }
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read())
        # Check for inline image
        found_image = False
        for cand in data.get("candidates", []):
            for part in cand.get("content", {}).get("parts", []):
                if part.get("inlineData", {}).get("data"):
                    img_bytes = base64.b64decode(part["inlineData"]["data"])
                    print(f"  {model}: OK ({len(img_bytes)} bytes, {part['inlineData'].get('mimeType')})")
                    found_image = True
                    break
            if found_image:
                break
        if not found_image:
            print(f"  {model}: NO IMAGE in response")
    except Exception as e:
        print(f"  {model}: FAILED - {e}")
