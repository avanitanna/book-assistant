import requests
import os
import logging
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file
# Configure logging
logging.basicConfig(level=logging.DEBUG)

def summarize_chapter(chapter):
    # Prepare the prompt
    prompt = f"""
    Chapter Content:
    {chapter}
    
    Please provide a concise summary of this chapter in 3-5 sentences.
    Extract the most important information, key facts, and main points.
    """
    
    # Prepare the request
    api_key = os.getenv("OPENROUTER_API_KEY")
    model = os.getenv("OPENROUTER_MODEL")
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant that summarizes book chapters."},
            {"role": "user", "content": prompt}
        ]
    }
    
    # Log headers and endpoint for debugging
    logging.debug(f"API Key: {api_key}")
    logging.debug(f"Headers: {headers}")
    logging.debug(f"Endpoint: https://openrouter.ai/api/v1/chat/completions")

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        return result["choices"][0]["message"]["content"]
    except requests.exceptions.RequestException as e:
        logging.error(f"Request failed: {e}")
        raise Exception(f"Error summarizing chapter: {str(e)}")
