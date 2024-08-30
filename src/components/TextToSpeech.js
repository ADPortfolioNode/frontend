import React, { useState } from 'react';
import axios from 'axios';
import MediaDisplay from './MediaDisplay';

const TextToSpeech = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/texttospeech', { message });
      setResponse(res.data.audioUrl);  // Assuming API returns an audio URL
    } catch (error) {
      console.error('Error generating speech:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Text to Speech</h3>
      <input
        type="text"
        className="form-control"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your text"
      />
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>
      {response && (
        <div className="response mt-3 p-3 bg-light rounded">
          <MediaDisplay mediaUrl={response} mediaType="audio" />
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
