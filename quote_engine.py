import google.generativeai as genai
import json
import re

# Configure Gemini API
GEMINI_API_KEY = "v1.CmQKHHN0YXRpY2tleS1lMDBzbmdwNjdwNG5jMnk5YzYSIXNlcnZpY2VhY2NvdW50LWUwMHA4ajNjaHp3enA3aDJnNzIMCIqm6ckGEJykl5wDOgwIiqmBlQcQgJfRlwFAAloDZTAw.AAAAAAAAAAFDkXS4T15b6WlOPDlbzZh6P9MQAZpWQ3Ti0-t3P6vyo19v0qty5wa8DOIeX_rs0U3ExM1MdEdBW9oG3x6SEQ8O"

genai.configure(api_key=GEMINI_API_KEY)

def get_ai_quotes(user_data):
    """
    Use AI to generate tailored insurance quotes based on user survey data.
    """
    try:
        # Prepare user data summary for AI
        user_summary = format_user_data(user_data)
        
        # Create prompt for AI
        prompt = f"""You are an expert insurance quote generator. Based on the following user information, generate personalized insurance quotes from three providers: Allstate, Progressive, and GEICO.

User Information:
{user_summary}

Generate three insurance quotes with:
1. Monthly price (realistic based on the user's profile)
2. Coverage details (bodily injury liability, property damage, medical payments)
3. Provider name

Consider these factors when pricing:
- Age and driving experience
- Vehicle information (year, make, model)
- Driving history (accidents, tickets, violations)
- Coverage preferences selected
- Location factors
- Discounts (student, defensive driving, etc.)

Return ONLY a valid JSON array with this exact format:
[
  {{
    "provider": "Allstate",
    "monthly_price": 120.50,
    "coverage": {{
      "bodily_injury": "$100,000",
      "property_damage": "$50,000",
      "medical_payments": "$5,000"
    }}
  }},
  {{
    "provider": "Progressive",
    "monthly_price": 110.25,
    "coverage": {{
      "bodily_injury": "$100,000",
      "property_damage": "$50,000",
      "medical_payments": "$5,000"
    }}
  }},
  {{
    "provider": "GEICO",
    "monthly_price": 105.75,
    "coverage": {{
      "bodily_injury": "$100,000",
      "property_damage": "$50,000",
      "medical_payments": "$5,000"
    }}
  }}
]

Make prices realistic and varied. Higher risk profiles should have higher prices. Lower risk profiles should have lower prices."""

        # Generate response using Gemini
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        
        # Extract JSON from response
        response_text = response.text.strip()
        
        # Try to extract JSON if it's wrapped in markdown code blocks
        json_match = re.search(r'```(?:json)?\s*(\[.*?\])\s*```', response_text, re.DOTALL)
        if json_match:
            response_text = json_match.group(1)
        else:
            # Try to find JSON array directly
            json_match = re.search(r'(\[.*?\])', response_text, re.DOTALL)
            if json_match:
                response_text = json_match.group(1)
        
        quotes = json.loads(response_text)
        
        # Validate and format quotes
        formatted_quotes = []
        for quote in quotes:
            formatted_quotes.append({
                "provider": quote.get("provider", "Unknown"),
                "monthly_price": round(float(quote.get("monthly_price", 100)), 2),
                "coverage": quote.get("coverage", {
                    "bodily_injury": "$100,000",
                    "property_damage": "$50,000",
                    "medical_payments": "$5,000"
                })
            })
        
        return formatted_quotes
        
    except Exception as e:
        print(f"AI quote generation error: {str(e)}")
        # Fallback to mock quotes if AI fails
        return get_mock_quotes(user_data)


def format_user_data(user_data):
    """Format user data into a readable summary for AI."""
    summary_parts = []
    
    # Personal information
    if user_data.get("1"):  # Full Name
        summary_parts.append(f"Name: {user_data.get('1')}")
    if user_data.get("2"):  # Date of Birth
        summary_parts.append(f"Date of Birth: {user_data.get('2')}")
    if user_data.get("10"):  # Gender
        summary_parts.append(f"Gender: {user_data.get('10')}")
    
    # Driver information
    if user_data.get("8"):  # Driver Name
        summary_parts.append(f"Driver Name: {user_data.get('8')}")
    if user_data.get("9"):  # Driver Date of Birth
        summary_parts.append(f"Driver Date of Birth: {user_data.get('9')}")
    if user_data.get("11"):  # Driving Experience
        summary_parts.append(f"Years of Driving Experience: {user_data.get('11')}")
    
    # Vehicle information
    if user_data.get("19"):  # Vehicle Year
        summary_parts.append(f"Vehicle Year: {user_data.get('19')}")
    if user_data.get("20"):  # Vehicle Make
        summary_parts.append(f"Vehicle Make: {user_data.get('20')}")
    if user_data.get("21"):  # Vehicle Model
        summary_parts.append(f"Vehicle Model: {user_data.get('21')}")
    if user_data.get("22"):  # Vehicle Trim
        summary_parts.append(f"Vehicle Trim: {user_data.get('22')}")
    if user_data.get("23"):  # Odometer
        summary_parts.append(f"Odometer Reading: {user_data.get('23')}")
    
    # Driving history
    if user_data.get("14"):  # Accidents 3 years
        summary_parts.append(f"Accidents in last 3 years: {user_data.get('14')}")
    if user_data.get("15"):  # Accidents 6 years
        summary_parts.append(f"Accidents in last 6 years: {user_data.get('15')}")
    if user_data.get("16"):  # Tickets 3 years
        summary_parts.append(f"Tickets in last 3 years: {user_data.get('16')}")
    if user_data.get("17"):  # Tickets 6 years
        summary_parts.append(f"Tickets in last 6 years: {user_data.get('17')}")
    if user_data.get("18"):  # Major violations
        summary_parts.append(f"Major violations in last 10 years: {user_data.get('18')}")
    
    # Coverage preferences
    if user_data.get("32"):  # Liability Coverage
        summary_parts.append(f"Liability Coverage Preference: {user_data.get('32')}")
    if user_data.get("33"):  # Uninsured Motorist
        summary_parts.append(f"Uninsured Motorist Preference: {user_data.get('33')}")
    if user_data.get("34"):  # Medical Payments
        summary_parts.append(f"Medical Payments Preference: {user_data.get('34')}")
    
    # Discounts
    if user_data.get("30"):  # Student Discount
        summary_parts.append(f"Student Discount Eligible: {user_data.get('30')}")
    if user_data.get("31"):  # Defensive Driving
        summary_parts.append(f"Defensive Driving Course Completed: {user_data.get('31')}")
    
    return "\n".join(summary_parts) if summary_parts else "No user information provided"


def get_mock_quotes(user):
    """
    Fallback quote logic if AI fails.
    """
    base_price = 110

    # Age factor
    dob = user.get("2") or user.get("9") or ""
    if dob:
        try:
            if "/" in dob:
                dob_year = int(dob.split("/")[-1])
            elif "-" in dob:
                dob_year = int(dob.split("-")[0])
            else:
                dob_year = int(dob[:4]) if len(dob) >= 4 else 1990
            age = 2025 - dob_year
        except:
            age = 30
    else:
        age = 30

    if age < 21:
        price_factor = 1.4
    elif age < 25:
        price_factor = 1.2
    else:
        price_factor = 1.0

    # Driving history
    if user.get("14") == "Yes" or user.get("15") == "Yes":
        price_factor += 0.2
    if user.get("16") == "Yes" or user.get("17") == "Yes":
        price_factor += 0.15
    if user.get("18") == "Yes":
        price_factor += 0.3

    # Discounts
    if user.get("30") == "Yes":  # Student discount
        price_factor -= 0.1
    if user.get("31") == "Yes":  # Defensive driving
        price_factor -= 0.05

    # Compute prices
    allstate = round(base_price * price_factor, 2)
    progressive = round(allstate * 0.92, 2)
    geico = round(allstate * 0.88, 2)

    return [
        {
            "provider": "Allstate",
            "monthly_price": allstate,
            "coverage": {
                "bodily_injury": "$100,000",
                "property_damage": "$50,000",
                "medical_payments": "$5,000"
            }
        },
        {
            "provider": "Progressive",
            "monthly_price": progressive,
            "coverage": {
                "bodily_injury": "$100,000",
                "property_damage": "$50,000",
                "medical_payments": "$5,000"
            }
        },
        {
            "provider": "GEICO",
            "monthly_price": geico,
            "coverage": {
                "bodily_injury": "$100,000",
                "property_damage": "$50,000",
                "medical_payments": "$5,000"
            }
        }
    ]
