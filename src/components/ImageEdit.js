import React, { useState } from 'react';
import axios from 'axios';
import MediaDisplay from './MediaDisplay';

const ImageEdit = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('message', message);
    if (file) formData.append('file', file);

    try {
      const res = await axios.post('/api/imageedit', formData);
      setResponse(res.data.editedImageUrl);  // Assuming API returns an edited image URL
    } catch (error) {
      console.error('Error editing image:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Edit Image</h3>
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
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>
      {response && (
        <div className="response mt-3 p-3 bg-light rounded">
          <MediaDisplay mediaUrl={response} mediaType="image" />
        </div>
      )}
    </div>
  );
};

export default ImageEdit;
