import os
import re
import json
import random
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
CEREBRAS_API_KEY = os.getenv("CEREBRAS_API_KEY")
HAS_API_KEY = bool(CEREBRAS_API_KEY)

API_URL = "https://api.cerebras.net/v1/generate"

# ---------------- Fallback/mock quotes ----------------
def get_mock_quotes(user_data):
    """
    Returns top 3 intensive insurance quotes based on user data.
    """
    age = calculate_age(user_data)
    base_price = 110

    # Risk adjustments
    factor = 1.0
    if age < 21:
        factor += 0.5
    elif age < 25:
        factor += 0.3
    if user_data.get("14") == "Yes" or user_data.get("15") == "Yes":
        factor += 0.25
    if user_data.get("16") == "Yes" or user_data.get("17") == "Yes":
        factor += 0.2
    if user_data.get("18") == "Yes":
        factor += 0.4

    # Discounts
    discounts = []
    if user_data.get("30") == "Yes":
        factor -= 0.12
        discounts.append("Good Student")
    if user_data.get("31") == "Yes":
        factor -= 0.08
        discounts.append("Defensive Driving")

    # Provider base multipliers
    providers = {
        "GEICO": 0.88,
        "USAA": 0.85,
        "Progressive": 0.92,
        "Farmers": 0.98,
        "Allstate": 1.0,
        "State Farm": 1.05
    }

    quotes = []
    for prov, mult in providers.items():
        monthly = round(base_price * factor * mult, 2)
        quotes.append({
            "provider": prov,
            "monthly_price": monthly,
            "annual_price": round(monthly * 12, 2),
            "coverage": {
                "bodily_injury": "$100,000/$300,000",
                "property_damage": "$100,000",
                "medical_payments": "$5,000",
                "comprehensive_deductible": "$500",
                "collision_deductible": "$500",
                "uninsured_motorist": "$100,000/$300,000"
            },
            "discounts_applied": discounts,
            "explanation": f"{prov} offers competitive pricing with applied discounts."
        })

    # Sort by monthly price and take top 3
    quotes = sorted(quotes, key=lambda x: x["monthly_price"])[:3]

    return {
        "analysis": {
            "risk_assessment": f"Age {age} and driving history create a moderate-to-high risk profile.",
            "vehicle_factors": f"Vehicle: {user_data.get('19', 'N/A')} {user_data.get('20', 'N/A')} {user_data.get('21', 'N/A')}",
            "coverage_recommendations": "Recommended: Liability minimums, consider collision/comprehensive if newer car.",
            "discount_opportunities": discounts or ["Multi-policy", "Paperless billing"]
        },
        "quotes": quotes,
        "recommendations": {
            "best_value": f"{quotes[0]['provider']} offers the best overall value.",
            "best_for_user": f"{quotes[0]['provider']} fits your profile best.",
            "coverage_suggestions": [
                "Increase liability limits",
                "Consider rental reimbursement",
                "Evaluate higher deductibles to lower premiums"
            ],
            "savings_tips": [
                "Bundle policies",
                "Maintain a clean driving record",
                "Pay annual premiums"
            ]
        }
    }

# ---------------- Helper functions ----------------
def calculate_age(user_data):
    dob = user_data.get("2") or ""
    if not dob:
        return 30
    try:
        if "/" in dob:
            year = int(dob.split("/")[-1])
        elif "-" in dob:
            year = int(dob.split("-")[0])
        else:
            year = int(dob[:4])
        return 2025 - year
    except:
        return 30

def format_user_data(user_data):
    parts = []
    if user_data.get("1"): parts.append(f"Name: {user_data['1']}")
    if user_data.get("2"): parts.append(f"DOB: {user_data['2']}")
    vehicle = " ".join(filter(None, [user_data.get("19"), user_data.get("20"), user_data.get("21")]))
    if vehicle: parts.append(f"Vehicle: {vehicle}")
    return "\n".join(parts) if parts else "No user info"

# ---------------- AI quote generator ----------------
def get_ai_quotes(user_data, simple_format=False):
    """
    Generate top 3 intensive insurance quotes via Cerebras API or fallback.
    """
    if not HAS_API_KEY:
        result = get_mock_quotes(user_data)
        return result["quotes"] if simple_format else result

    # Prepare prompt
    user_summary = format_user_data(user_data)
    prompt = f"""
You are an expert insurance analyst. Provide 6 detailed insurance quotes for this user.
Include coverage, monthly_price, annual_price, discounts_applied, explanation.
Return JSON with keys: analysis, quotes, recommendations.

User Info:
{user_summary}
"""

    try:
        headers = {
            "Authorization": f"Bearer {CEREBRAS_API_KEY}",
            "Content-Type": "application/json"
        }
        data = {
            "prompt": prompt,
            "model": "llama-3.3-70b",
        }
        response = requests.post(API_URL, headers=headers, json=data)
        response.raise_for_status()
        resp_json = response.json()
        # Extract JSON string from response if necessary
        response_text = resp_json.get("output_text") or json.dumps(resp_json)

        # Attempt to parse JSON
        json_match = re.search(r'```(?:json)?\s*(\{.*\})\s*```', response_text, re.DOTALL)
        if json_match:
            response_text = json_match.group(1)
        result = json.loads(response_text)
    except Exception as e:
        print(f"Cerebras API error: {e}")
        result = get_mock_quotes(user_data)

    # Keep top 3 by monthly price
    sorted_quotes = sorted(result["quotes"], key=lambda q: q.get("monthly_price", 9999))[:3]
    result["quotes"] = sorted_quotes

    return result["quotes"] if simple_format else result

# ---------------- Optional helpers ----------------
def get_simple_quotes(user_data):
    return get_ai_quotes(user_data, simple_format=True)

def get_full_response(user_data):
    return get_ai_quotes(user_data, simple_format=False)
