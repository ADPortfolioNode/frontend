import React, { useState } from 'react';
import '../Chat.css'; // Optional: Create a separate CSS file for animations

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const handleSendMessage = async () => {
        if (!userInput) return;

        // Display user message
        const newMessages = [...messages, { role: 'user', content: userInput }];
        setMessages(newMessages);
        setUserInput('');

        try {
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: userInput }]
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Display AI response
                setMessages([...newMessages, { role: 'ai', content: data.response }]);
            } else {
                setMessages([...newMessages, { role: 'ai', content: 'Error: ' + data.error }]);
            }
        } catch (error) {
            setMessages([...newMessages, { role: 'ai', content: 'Error: ' + error.message }]);
        }
    };

    return (
        <div className="chat-container">
            <h1>AI Saraine</h1>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        {msg.role === 'user' ? 'User: ' : 'AI: '}{msg.content}
                    </div>
                ))}
            </div>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message here..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
