import React, { useState } from 'react';

function FetchBook({ setSelectedChapter }) {
    const [url, setUrl] = useState('');
    const [book, setBook] = useState(null);

    const fetchBook = () => {
        fetch(`http://127.0.0.1:5000/fetch_book?url=${encodeURIComponent(url)}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setBook(data);
                }
            })
            .catch(error => console.error('Error fetching book:', error));
    };

    const handleChapterSelect = (e) => {
        const chapterContent = e.target.value;
        setSelectedChapter(chapterContent);
    };

    return (
        <div>
            <h2>Fetch Book</h2>
            <input
                type="text"
                placeholder="Enter Project Gutenberg URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button 
                onClick={fetchBook}
                style={{
                    padding: '8px 16px',
                    marginLeft: '10px',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Fetch Book
            </button>
            {book && (
                <div>
                    <h3>Book Preview:</h3>
                    <pre>{book.content.substring(0, 500)} ...</pre>
                    {book.chapters && book.chapters.length > 0 && (
                        <div>
                            <h3>Select a Chapter:</h3>
                            <select onChange={handleChapterSelect}>
                                <option value="">--Select Chapter--</option>
                                {book.chapters.map((chapter, index) => (
                                    <option key={index} value={chapter.content}>
                                        {chapter.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FetchBook;