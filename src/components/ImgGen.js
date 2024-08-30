import React, { useState } from 'react';
import axios from 'axios';

const ImageGen = () => {
    const [file, setFile] = useState(null);
    const [transcript, setImage] = useState(''); // State to hold the transcription result
    const [error, setError] = useState(''); // State to hold any errors

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setImage(''); // Clear the image when a new file is selected
        setError(''); // Clear any previous errors
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a Photo before uploading.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/imggen', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setImage(response.data.transcript); // Set the transcription result
            setError(''); // Clear any errors
        } catch (error) {
            setError('Error uploading file: ' + error.message); 
        }
    };

    return (
        <div>
            <h1>Upload Speech Transcription File</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            {transcript && (
                <div>
                    <h2>Transcription Result:</h2>
                    <p>{transcript}</p>
                </div>
            )}

            {error && (
                <div>
                    <h2>Error:</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default ImageGen;
