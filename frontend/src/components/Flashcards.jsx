import React, { useState } from 'react';

function removeMarkdown(text) {
    if (!text) return '';
    return text.replace(/\*+/g, '');
}

function Flashcard({ card }) {
    const [flipped, setFlipped] = useState(false);

    const cardContainerStyles = {
        perspective: '1000px',
        margin: '10px'
    };

    const cardStyles = {
        position: 'relative',
        width: '300px',
        height: '200px',
        cursor: 'pointer',
        transition: 'transform 0.6s',
        transformStyle: 'preserve-3d',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transform: flipped ? 'rotateY(180deg)' : 'none'
    };

    const faceStyles = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        padding: '10px',
        boxSizing: 'border-box',
        textAlign: 'center'
    };

    const frontStyles = {
        ...faceStyles,
        backgroundColor: '#fff',
        border: '1px solid #ddd'
    };

    const backStyles = {
        ...faceStyles,
        backgroundColor: '#f7f7f7',
        border: '1px solid #ddd',
        transform: 'rotateY(180deg)'
    };

    return (
        <div style={cardContainerStyles} onClick={() => setFlipped(!flipped)}>
            <div style={cardStyles}>
                <div style={frontStyles}>
                    {removeMarkdown(card.question)}
                </div>
                <div style={backStyles}>
                    {removeMarkdown(card.answer)}
                </div>
            </div>
        </div>
    );
}

function Flashcards({ summary }) {
    const [flashcards, setFlashcards] = useState([]);
    const [error, setError] = useState('');

    const generateFlashcards = () => {
        if (!summary) {
            setError('Please generate a summary first.');
            return;
        }
        setError('');
        fetch('http://127.0.0.1:5000/flashcards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ summary })
        })
            .then(response => response.json())
            .then(data => {
                setFlashcards(data);
            })
            .catch(error => {
                console.error('Error generating flashcards:', error);
                setError('An error occurred while generating flashcards.');
            });
    };

    return (
        <div>
            <h2>Flashcards</h2>
            <button 
                onClick={generateFlashcards}
                style={{
                    padding: '8px 16px',
                    marginBottom: '20px',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Generate Flashcards
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}
            >
                {flashcards.map((card, index) => (
                    <Flashcard key={index} card={card} />
                ))}
            </div>
        </div>
    );
}

export default Flashcards;