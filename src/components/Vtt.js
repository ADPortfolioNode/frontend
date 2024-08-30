import React, { useState } from 'react';
import axios from 'axios';

const Speech = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/vtt', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return(response.data);
        } catch (error) {
            return('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>Upload Video to text File</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Speech;
