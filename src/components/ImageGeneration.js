import React, { useState } from 'react';
import axios from 'axios';
import MediaDisplay from './MediaDisplay';
import InteractionPanel from '../components/InteractionPanel.js';

const ImageGeneration = () => {
  const [message] = useState('');
  const [airesponse, setAiResponse] = useState('')
  const [ImageUrl, setImageUrl] = useState('')
  


  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/imggen', { prompt : message });
      
      console.log(res.data['message'],res.data['saved_path'])
      setAiResponse(res.data['message']);
      setImageUrl(res.data['saved_path']); 
       // Assuming API returns an image URL
    } catch (error) {
      console.error('Error generating image:', error.message);
    }
  };

  return (
    <div className="container mt-3 ">
      <InteractionPanel initialEndpoint={'Image-Generation'} />
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>
      
     <h3>Generate Image</h3> 
    <MediaDisplay mediaUrl={ImageUrl} message={airesponse} />
    </div>
  );
};

export default ImageGeneration;
