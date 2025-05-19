from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from app.services.book_service import fetch_book_content_and_chapters
from app.services.summary_service import summarize_chapter
from app.services.flashcard_service import generate_flashcards

app = Flask(__name__)
CORS(app) 

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Book Assistant API!"})

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    try:
        summary = summarize_chapter(data['chapter'])
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/flashcards', methods=['POST'])
def flashcards():
    data = request.json
    return jsonify(generate_flashcards(data['summary']))

@app.route('/fetch_book', methods=['GET'])
def fetch_book():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL parameter is required"}), 400

    try:
        # Fetch the book and parse chapters.
        book = fetch_book_content_and_chapters(url)
        return jsonify(book)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Error fetching book content: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)