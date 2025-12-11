import random

def insurance_ai_response(message):
    """
    Extremely simple rule-based AI assistant for MVP.
    Replace with GPT API later.
    """

    message = message.lower()

    if "deductible" in message:
        return "A deductible is the amount you pay out-of-pocket before your insurance starts covering costs."

    if "premium" in message:
        return "Your premium is the amount you pay each month or year to maintain your insurance coverage."

    if "why is my rate high" in message or "rate" in message:
        return "Rates increase for young drivers due to limited driving history, higher risk profiles, and claims data."

    canned = [
        "Insurance rates depend on factors like age, location, vehicle type, and driving history.",
        "I'm here to help you compare coverage options in simple terms!",
        "Safer driving and maintaining continuous coverage usually help lower your rates over time.",
        "Let me know if you'd like to understand any coverage terms."
    ]

    return random.choice(canned)

