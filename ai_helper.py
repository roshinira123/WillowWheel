import os
import random
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
CEREBRAS_API_KEY = os.getenv("CEREBRAS_API_KEY")
HAS_API_KEY = bool(CEREBRAS_API_KEY)

# ⭐ CORRECTED API endpoint - Cerebras uses OpenAI-compatible format
API_URL = "https://api.cerebras.ai/v1/chat/completions"

# ---------------- Fallback chatbot responses ----------------
def fallback_response(message):
    """Simple canned responses if AI is unavailable."""
    lower_msg = message.lower()
    if "deductible" in lower_msg:
        return "A deductible is what you pay out-of-pocket before your insurance covers the rest."
    if "premium" in lower_msg:
        return "A premium is what you pay monthly or annually to keep your coverage active."
    if "rate" in lower_msg or "factor" in lower_msg:
        return "Rates depend on age, driving record, vehicle type, location, coverage level, and credit score in some states."
    if "important" in lower_msg or "why insurance" in lower_msg:
        return "Insurance protects you from financial devastation after accidents, covers liability if you harm others, and is legally required in most states."
    if "high" in lower_msg and "insurance" in lower_msg:
        return "High rates can be due to age, accidents, location, vehicle type, coverage level, or credit score. Shop around and ask about discounts!"
    if "coverage" in lower_msg:
        return "Coverage is the protection your insurance provides. Common types include liability, collision, comprehensive, and uninsured motorist coverage."
    
    canned = [
        "I'm here to help you understand insurance! What would you like to know?",
        "Insurance can seem complicated, but I'll explain it in simple terms. What's your question?",
        "Let me help you compare coverage options and understand your policy better!",
    ]
    return random.choice(canned)

# ---------------- Chatbot function ----------------
def insurance_ai_response(message):
    """
    Generates a concise insurance chatbot reply via Cerebras API, or fallback.
    """
    if not HAS_API_KEY:
        print("⚠️ No API key found - using fallback")
        return fallback_response(message)

    try:
        headers = {
            "Authorization": f"Bearer {CEREBRAS_API_KEY}",
            "Content-Type": "application/json"
        }
        
        # ⭐ CORRECTED: Use chat/completions format (OpenAI-compatible)
        data = {
            "model": "llama3.1-8b",  # CORRECT,  # or "llama3.1-8b" for faster responses
            "messages": [
                {
                    "role": "system",
                    "content": "You are a friendly, concise auto insurance assistant. Answer questions in 2-4 sentences, avoid jargon, and provide practical next steps if relevant."
                },
                {
                    "role": "user",
                    "content": message
                }
            ],
            "temperature": 0.7,
            "max_tokens": 150
        }
        
        print(f"🔄 Sending request to Cerebras API...")
        response = requests.post(API_URL, headers=headers, json=data, timeout=10)
        
        print(f"📊 Status code: {response.status_code}")
        
        response.raise_for_status()
        resp_json = response.json()
        
        print(f"📦 Response: {resp_json}")

        # ⭐ CORRECTED: Extract text from OpenAI-compatible format
        if "choices" in resp_json and len(resp_json["choices"]) > 0:
            text = resp_json["choices"][0]["message"]["content"]
            return text.strip()
        else:
            print("⚠️ Unexpected response format, using fallback")
            return fallback_response(message)

    except requests.exceptions.RequestException as e:
        print(f"❌ Cerebras API request error: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response content: {e.response.text}")
        return fallback_response(message)
    except Exception as e:
        print(f"❌ Cerebras chatbot error: {type(e).__name__}: {e}")
        return fallback_response(message)

# ---------------- Example usage ----------------
if __name__ == "__main__":
    print("Insurance Chatbot Ready!")
    print(f"API Key loaded: {HAS_API_KEY}")
    print("-" * 50)
    
    while True:
        user_input = input("You: ")
        if user_input.lower() in ("exit", "quit"):
            break
        reply = insurance_ai_response(user_input)
        print(f"Bot: {reply}\n")