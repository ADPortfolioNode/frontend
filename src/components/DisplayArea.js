import React, { useState } from 'react';
import './DisplayArea.css'; // Ensure your CSS handles layout styling

const DisplayArea = ({ apiEndpoint }) => {
    const [prompt, setPrompt] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [aiImageUrl, setAIImageUrl] = useState('');
    const [responseText, setResponseText] = useState('');

    const handleTextChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        // Call the API with prompt and uploaded image
        // Note: You would need to handle form data submission and API calls
        try {
            const formData = new FormData();
            formData.append('prompt', prompt);
            if (uploadedImage) {
                formData.append('file', uploadedImage);
            }

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setAIImageUrl(data.imageUrl); // Assuming your response contains this field
            setResponseText(data.textResponse); // Assuming your response contains this field
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="display-area layout-container">
           
            <div className="result-display-area">
                {aiImageUrl && 
                    <img src={aiImageUrl} alt="AI Response" className="ai-response-img" />
                }
                <textarea 
                    value={responseText} 
                    readOnly
                    className="response-textarea" 
                    rows="4"
                    placeholder="AI response will be displayed here..."
                ></textarea>
            </div>
        </div>
    );
};

export default DisplayArea;