import React, { useState } from 'react';
import axios from 'axios';

const ChatWithAI = () => {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        const userMessage = input.trim();
        setChatHistory([...chatHistory, { sender: 'You', message: userMessage }]);

        try {
            const res = await axios.post('http://127.0.0.1:5000/api/cwai', { message: userMessage });
            const aiMessage = res.data.response || "No response from AI.";
            setChatHistory([...chatHistory, { sender: 'You', message: userMessage }, { sender: 'AI', message: aiMessage }]);
        } catch (error) {
            setChatHistory([...chatHistory, { sender: 'AI', message: 'Error communicating with the AI.' }]);
        }

        setInput('');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Chat with AI</h1>
            <div style={{ marginBottom: '20px', height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {chatHistory.map((chat, index) => (
                    <p key={index}><strong>{chat.sender}:</strong> {chat.message}</p>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type your message..." 
                    style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
                />
                <br />
                <button type="submit" style={{ padding: '10px 20px' }}>Send</button>
            </form>
        </div>
    );
};

export default ChatWithAI;
