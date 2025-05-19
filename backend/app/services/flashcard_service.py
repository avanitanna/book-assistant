import requests
import os
import re
from dotenv import load_dotenv

load_dotenv()

def generate_flashcards(summary):
    # Prepare the prompt
    prompt = f"""
    Summary:
    {summary}
    
    Please generate flashcards based on the above summary. Each flashcard should have a question and an answer.
    Format the flashcards as follows:
    Question: [Your question here]
    Answer: [Your answer here]
    For example:
    Question: What is the main theme of the chapter?
    Answer: The main theme is the exploration of human emotions and relationships.
    Please provide at least 5 and at most 10 flashcards.
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
            {"role": "system", "content": "You are a helpful assistant that generates flashcards for study purposes."},
            {"role": "user", "content": prompt}
        ]
    }
    
    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        raw_flashcards = result["choices"][0]["message"]["content"]
        # Robustly parse the raw response using regex
        pattern = re.compile(
            r"Question:\s*(?P<question>.*?)\s*Answer:\s*(?P<answer>.*?)(?=Question:|\Z)",
            re.DOTALL | re.IGNORECASE
        )
        flashcards = []
        for match in pattern.finditer(raw_flashcards):
            question = match.group("question").strip()
            answer = match.group("answer").strip()
            if question and answer:
                flashcards.append({"question": question, "answer": answer})
        return flashcards
    except requests.exceptions.RequestException as e:
        raise Exception(f"Error generating flashcards: {str(e)}")
