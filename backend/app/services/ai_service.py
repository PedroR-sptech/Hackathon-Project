import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))

SYSTEM_PROMPT = """You are IntelliAssist, a helpful, friendly, and intelligent AI assistant. 
You help users with questions, tasks, analysis, and problem-solving. 
Always respond in the same language the user writes in.
Be concise but thorough, and always aim to provide accurate and useful responses."""

def get_ai_response(messages: list[dict]) -> str:
    """
    Get AI response from OpenAI API.
    messages: list of {"role": "user"/"assistant", "content": "..."}
    """
    try:
        full_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=full_messages,
            max_tokens=1000,
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        error_msg = str(e)
        if "api_key" in error_msg.lower() or "authentication" in error_msg.lower():
            return "⚠️ API key not configured. Please set the OPENAI_API_KEY environment variable in the backend."
        return f"⚠️ Error communicating with AI service: {error_msg}"
