import React, { useState } from 'react';
import ChapterSummary from './components/ChapterSummary';
import Flashcards from './components/Flashcards';
import FetchBook from './components/FetchBook';

function App() {
    const [selectedChapter, setSelectedChapter] = useState('');
    const [summary, setSummary] = useState('');

    return (
        <div style={{
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Book Assistant</h1>
            <div style={{
                backgroundColor: '#f9f9f9', 
                padding: '15px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '20px'
            }}>
                <FetchBook setSelectedChapter={setSelectedChapter} />
            </div>
            <div style={{
                backgroundColor: '#f9f9f9', 
                padding: '15px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '20px'
            }}>
                <ChapterSummary 
                    selectedChapter={selectedChapter} 
                    summary={summary}
                    setSummary={setSummary} 
                />
            </div>
            <div style={{
                backgroundColor: '#f9f9f9', 
                padding: '15px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <Flashcards summary={summary} />
            </div>
        </div>
    );
}

export default App;