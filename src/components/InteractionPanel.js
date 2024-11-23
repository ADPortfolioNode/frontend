import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/InteractivePanel.css'; // Corrected import statement

const InteractionPanel = ({ setResponse }) => {
    const [selectedEndpoint, setSelectedEndpoint] = useState('/api/chat');
    const [input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(selectedEndpoint, { message: input });
            setResponse(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="endpoint">Select Endpoint:</label>
                    <select
                        id="endpoint"
                        className="form-control"
                        value={selectedEndpoint}
                        onChange={(e) => setSelectedEndpoint(e.target.value)}
                    >
                        <option value="/api/chat">Chat</option>
                        <option value="/api/tts">Text to Speech</option>
                        <option value="/api/transcribe">Transcribe Audio</option>
                        <option value="/api/translate">Translate Audio</option>
                        <option value="/api/vtt">Generate VTT</option>
                        <option value="/api/imgEdit">Edit Image</option>
                        <option value="/api/imgVariation">Image Variation</option>
                        <option value="/api/imggen">Generate Image</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="input">Input:</label>
                    <input
                        type="text"
                        id="input"
                        className="form-control"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

InteractionPanel.propTypes = {
  setResponse: PropTypes.func.isRequired,
};

export default InteractionPanel;