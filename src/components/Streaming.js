// Streaming.js or Streaming.jsx
import React, { useEffect } from 'react';

const Streaming = () => {
    useEffect(() => {
        const streamCompletion = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/streaming', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: "Hello!" }),
                });

                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    return(chunk);
                    // You can update the UI here with each chunk of the response
                }
            } catch (error) {
                return('Error streaming completion:', error);
            }
        };

        streamCompletion();
    }, []);

    return (
        <div>
            <h1>Streaming Component</h1>
            {/* Add more UI elements here as needed */}
        </div>
    );
};

export default Streaming;
