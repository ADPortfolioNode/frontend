import React, { useState } from 'react';
import axios from 'axios';

const TextSummarization = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/textsummarization', { message });
      setResponse(res.data.summary);  // Assuming API returns a summary
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Text Summarization</h3>
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
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default TextSummarization;
