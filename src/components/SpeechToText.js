import React, { useState } from 'react';
import axios from 'axios';

const SpeechToText = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const formData = new FormData();
    if (file) formData.append('file', file);

    try {
      const res = await axios.post('/api/stt', formData);
      setResponse(res.data.transcription);  // Assuming API returns a transcription
    } catch (error) {
      console.error('Error processing audio:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Speech to Text</h3>
      <input
        type="file"
        className="form-control"
        onChange={(e) => setFile(e.target.files[0])}
        accept="audio/*"
      />
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>
      {response && (
        <div className="response mt-3 p-3 bg-light rounded">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default SpeechToText;
