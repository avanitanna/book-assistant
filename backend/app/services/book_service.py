import requests
import re

def fetch_book_content_and_chapters(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        content = response.text

        # Use a regex to capture generic chapter headings ("Chapter" followed by any word/number)
        pattern = re.compile(r'(Chapter\s+\S+)', re.IGNORECASE)
        matches = list(pattern.finditer(content))
        chapters = []

        if matches:
            # Create chapters based on matched positions.
            for i, match in enumerate(matches):
                start = match.start()
                # End at the start of the next match if available, else end of content.
                end = matches[i+1].start() if i+1 < len(matches) else len(content)
                chapter_text = content[start:end].strip()
                chapters.append({
                    "title": match.group().strip(),
                    "content": chapter_text
                })
        else:
            # If no chapter markers are found, include the full text as one chapter.
            chapters.append({
                "title": "Full Book",
                "content": content.strip()
            })

        # Save the fetched book along with its chapters.
        book = {"url": url, "content": content, "chapters": chapters}
        return book
    except requests.exceptions.RequestException as e:
        raise Exception(f"Error fetching book content: {str(e)}")