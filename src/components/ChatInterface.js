import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const ChatInterface = ({ setResponse, loading, setLoading }) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && files.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data);

      // Clear form
      setMessage('');
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Error initiating chat:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <div className="chat-interface" style={{ width: '100%' }}>
      <h4>Initiate Chat</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            disabled={loading}
            ref={fileInputRef}
            multiple
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || (!message.trim() && files.length === 0)}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

ChatInterface.propTypes = {
  setResponse: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default ChatInterface;
