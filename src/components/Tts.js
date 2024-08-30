import React, { useState } from 'react';
import axios from 'axios';

const Speech = () => {
    const [userMessage, setUserMessage] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return; // Prevent sending empty messages

        try {
            const response = await axios.post('http://localhost:5000/api/tts', {
                text: userMessage,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Assuming the response contains a URL to the audio file
            setAudioUrl(response.data.audioUrl); // Adjust based on your API response structure
        } catch (error) {
            console.error('Error generating speech:', error);
        }

        // Clear the input field
        setUserMessage('');
    };

    return (
        <div className="speech-container">
            <h2>Text-to-Speech Converter</h2>
            <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
            />
            <button onClick={handleSendMessage}>Convert to Speech</button>
            {audioUrl && (
                <div>
                    <h3>Generated Speech</h3>
                    <audio controls>
                        <source src={audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default Speech;
