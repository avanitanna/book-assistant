import React, { useState } from 'react';

function ChapterSummary({ selectedChapter, summary, setSummary }) {
    const [error, setError] = useState('');

    const summarizeChapter = () => {
        if (!selectedChapter) {
            setError('Please select a chapter to summarize.');
            return;
        }
        setError('');
        fetch('http://127.0.0.1:5000/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chapter: selectedChapter })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setSummary(data.summary);
                }
            })
            .catch(error => {
                console.error('Error summarizing chapter:', error);
                setError('An error occurred while summarizing the chapter.');
            });
    };

    return (
        <div>
            <h2>Chapter Summary</h2>
            {selectedChapter ? (
                <div>
                    <p>Selected Chapter Preview:</p>
                    <pre>{selectedChapter.substring(0, 300)} ...</pre>
                    <button 
                        onClick={summarizeChapter}
                        style={{
                            padding: '8px 16px',
                            marginTop: '10px',
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Summarize Chapter
                    </button>
                </div>
            ) : (
                <p>Please select a chapter from the fetched book.</p>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {summary && (
                <div>
                    <h3>Summary</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}

export default ChapterSummary;