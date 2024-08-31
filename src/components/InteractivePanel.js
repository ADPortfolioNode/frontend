import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InteractivePanel = ({ initialEndpoint, onResponse }) => {
  const [activeEndpoint, setActiveEndpoint] = useState(initialEndpoint);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Update activeEndpoint whenever initialEndpoint changes
  useEffect(() => {
    setActiveEndpoint(initialEndpoint);
  }, [initialEndpoint]);

  const handleSubmit = async () => {
    try {
      let res;
      const formData = new FormData();
      formData.append('prompt', message);
      if (file) formData.append('file', file);

      switch (activeEndpoint) {
        case 'Chat':
          res = await axios.post('http://localhost:5000/api/chat', { message: message });
          setResponse(res.data.response);
          setImageUrl('');
          break;
        case 'Language-Translation':
          res = await axios.post('http://localhost:5000/api/stt', formData);
          setResponse(res.data.message);
          setImageUrl(res.data.saved_path);
          break;
        case 'Home':
          res = await axios.post('http://localhost:5000/api/chat', { message: message });
          setResponse(res.data.message);
          setImageUrl('');
          break;
        case 'Video-Analysis':
          res = await axios.post('http://localhost:5000/api/vtt', formData);
          setResponse(res.data.message);
          setImageUrl(res.data.saved_path);
          break;
        case 'Image-Generation':
          res = await axios.post('http://localhost:5000/api/imggen', formData);
          setResponse(res.data.message);
          setImageUrl(res.data.saved_path);
          break;
        case 'Text-Summarization':
          res = await axios.post('http://localhost:5000/api/tts', formData);
          setResponse(res.data.message);
          setImageUrl(res.data.saved_path);
          break;
        default:
          console.error('Unsupported endpoint');
          return;
      }

      onResponse({ response: response , imageUrl: imageUrl });
    } catch (error) {
      console.error('Error processing request:', error.message);
    }
  };

  const renderInputComponents = () => {
    switch (activeEndpoint) {
      case 'Chat':
      case 'Image-Generation':
      case 'Text-to-Speech':
        return (
          <input
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your prompt" 
          />
        );

      case 'Image-Editing':
      case 'Speech-to-Text':
      case 'Video-to-Text':
        return (
          <>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
              accept={activeEndpoint === 'Image-Editing' ? 'image/*' : activeEndpoint === 'Speech-to-Text' ? 'audio/*' : 'video/*'}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="col-4 ">
      <h3>{activeEndpoint.replace(/-/g, ' ')} with AI</h3>
      {renderInputComponents()}
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default InteractivePanel;
