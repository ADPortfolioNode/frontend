import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Add this line

const ChatArea = ({ chatHistory }) => {
    return (
        <div className="chat-area">
            <h4>Chat</h4>
            {chatHistory.map((chat, index) => (
                <div key={index} className={chat.sender === 'User' ? 'user-message' : 'ai-message'}>
                    <strong>{chat.sender}:</strong> {chat.text}
                </div>
            ))}
        </div>
    );
};

const Chat = ({ chatHistory, setChatHistory }) => {
    const [userMessage, setUserMessage] = useState('');

    useEffect(() => {
        // Listen for state changes and update component state
        // Example: setState(globalState);
    }, []);

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        // Add user message to chat history
        setChatHistory(prev => [...prev, { sender: 'User', text: userMessage }]);

        try {
            // Send message to the backend
            const response = await axios.post('http://localhost:5000/api/chat', {
                message: userMessage,
            });

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
        <div className="chat-container">
            <h2>Chat with AI</h2>
            <ChatArea chatHistory={chatHistory} />
            <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;