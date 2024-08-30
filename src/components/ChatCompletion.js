import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        // Add user message to chat history
        setChatHistory(prev => [...prev, { sender: 'User', text: userMessage }]);

        try {
            // Send message to the backend (corrected URL to match your Flask endpoint)
            const response = await axios.post('http://localhost:5000/api/chat', {
                message: userMessage,
            });
            console.log(response.data[0])
            // Add AI response to chat history
            setChatHistory(prev => [...prev, { sender: 'AI', text: response.data.response }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setChatHistory(prev => [...prev, { sender: 'AI', text: 'Error: Unable to get response.' }]);
        }

        // Clear the input field
        setUserMessage('');
    };

    return (
        <div className="container mt-5">            <h2>Chat with AI</h2>
            <div className="chat-window">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={chat.sender === 'User' ? 'user-message' : 'ai-message'}>
                        <strong>{chat.sender}:</strong> {chat.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                prompt={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Prompt me..."
                onMouseDown={(e) => e.key === 'Enter' ? handleSendMessage() : null}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
