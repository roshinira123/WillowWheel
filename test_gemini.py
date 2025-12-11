"""
Test script to diagnose Gemini API issues.

Usage: python3 test_gemini.py
"""

import os

import google.generativeai as genai
from dotenv import load_dotenv


def main():
    print("=" * 60)
    print("GEMINI API DIAGNOSTIC TEST")
    print("=" * 60)

    # Step 1: Check if .env loads
    print("\n1. Checking .env file...")
    load_dotenv()
    api_key = os.getenv("API_KEY")
    gemini_api_key = os.getenv("GEMINI_API_KEY")

    if api_key:
        print(f"   ✓ API_KEY found: {api_key[:20]}...")
    else:
        print("   ✗ API_KEY not found in .env")

    if gemini_api_key:
        print(f"   ✓ GEMINI_API_KEY found: {gemini_api_key[:20]}...")
    else:
        print("   ✗ GEMINI_API_KEY not found in .env")

    # Determine which key to use
    key_to_use = api_key or gemini_api_key

    if not key_to_use:
        print("\n❌ NO API KEY FOUND!")
        print("   Add this to your .env file:")
        print("   API_KEY=your_actual_key_here")
        return

    # Step 2: Configure Gemini
    print("\n2. Configuring Gemini API...")
    try:
        genai.configure(api_key=key_to_use)
        print("   ✓ Configuration successful")
    except Exception as e:
        print(f"   ✗ Configuration failed: {e}")
        return

    # Step 3: List available models
    print("\n3. Checking available models...")
    try:
        models = genai.list_models()
        print("   Available models:")
        for m in models:
            if "gemini" in m.name.lower():
                print(f"     • {m.name}")
    except Exception as e:
        print(f"   ✗ Failed to list models: {e}")
        print("   This might mean API key is invalid or quota exceeded")

    # Step 4: Test simple generation
    print("\n4. Testing text generation...")
    test_models = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "models/gemini-1.5-flash",
        "gemini-pro",
        "models/gemini-pro",
    ]

    working_model = None

    for model_name in test_models:
        print(f"\n   Testing: {model_name}")
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content("Say 'hello' in one word")
            result = (response.text or "").strip()
            print(f"   ✓ SUCCESS! Response: '{result}'")
            working_model = model_name
            break
        except Exception as e:
            error_msg = str(e)
            if "not found" in error_msg.lower():
                print("   ✗ Model not found")
            elif "quota" in error_msg.lower() or "limit" in error_msg.lower():
                print(f"   ✗ Quota/rate limit: {error_msg[:100]}")
            elif "permission" in error_msg.lower() or "billing" in error_msg.lower():
                print(f"   ✗ Billing/permission issue: {error_msg[:100]}")
            else:
                print(f"   ✗ Error: {error_msg[:100]}")

    if not working_model:
        print("\n❌ NO MODELS WORKED!")
        print("\nPossible issues:")
        print("  1. Invalid API key")
        print("  2. Billing not enabled in Google Cloud")
        print("  3. API quota exceeded")
        print("  4. Wrong API service enabled")
        print("\nCheck: https://makersuite.google.com/app/apikey")
    else:
        print(f"\n✅ WORKING MODEL: {working_model}")

    # Step 5: Test insurance chatbot prompt
    print("\n5. Testing insurance chatbot prompt...")
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = (
            "You are an insurance expert. Answer this question in 2-3 sentences:\n\n"
            "User question: What is a deductible?"
        )
        response = model.generate_content(prompt)
        result = (response.text or "").strip()

        print("   ✓ Response received:")
        print(f"   {result}")

        if len(result) < 50:
            print("   ⚠ Response seems too short - might be generic")
        else:
            print("   ✓ Response looks detailed and specific")

    except Exception as e:
        print(f"   ✗ Failed: {e}")

    print("\n" + "=" * 60)
    print("DIAGNOSTIC COMPLETE")
    print("=" * 60)


if __name__ == "__main__":
    main()

