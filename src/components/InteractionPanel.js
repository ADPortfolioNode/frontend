import React, { useState } from 'react';
import axios from 'axios';
import MediaDisplay from './MediaDisplay';

const InteractivePanel = ({ initialEndpoint }) => {
  const [activeEndpoint] = useState(initialEndpoint);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      let res;
      const formData = new FormData();
      formData.append('prompt', message);
      if (file) formData.append('file', file);

      // Check for consistent endpoint names
      switch (activeEndpoint) {
        case 'Chat':
          res = await axios.post('http://localhost:5000/api/chat', { message: message });
          break;
        case 'Home':
          res = await axios.post('http://localhost:5000/api/chat', { message: message });
          break;
        case 'Image-Generation':
          res = await axios.post('http://localhost:5000/api/imggen', { prompt: message });
          break;
        case 'Image-Editing':
          res = await axios.post('http://localhost:5000/api/imgedit', formData);
          break;
        case 'Speech-to-Text':
          res = await axios.post('http://localhost:5000/api/speechtotext', formData);
          break;
        case 'Text-to-Speech':
          res = await axios.post('http://localhost:5000/api/texttospeech', { prompt: message });
          break;
        case 'Video-to-Text':
          res = await axios.post('http://localhost:5000/api/vtt', formData);
          break;
        default:
          console.error('Unsupported endpoint');
          return;
      }

      // Correctly access the response data
      console.log(res);
      setResponse(res.data.message || res.data.saved_path || res.data.transcription || 'No response received');
    } catch (error) {
      console.error('Error processing request:', error.message);
    }
  };

  const renderInputComponents = () => {
    switch (activeEndpoint) {
      case 'Home':
      case 'Chat':
      case 'Image-Generation':
      case 'Text-to-Speech':
        return (
          <input
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Prompt me"
          />
        );

      case 'Image-Editing':
        return (
          <>
            <input
              type="text"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your instructions"
            />
            <input
              type="file"
              className="form-control mt-3"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
            />
          </>
        );

      case 'Speech-to-Text':
        return (
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
            accept="audio/*"
          />
        );

      case 'Video-to-Text':
        return (
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
            accept="video/*"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="col-3">
      <h3>{activeEndpoint.replace(/-/g, ' ')} with AI</h3>

      {renderInputComponents()}

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>

      {response && (
        <div className="response mt-3 p-3 bg-light rounded">
          <p>{response}</p>

          {file && (
            <MediaDisplay mediaUrl={URL.createObjectURL(file)} mediaType={file.type.split('/')[0]} />
          )}
        </div>
      )}
    </div>
  );
};

export default InteractivePanel;
