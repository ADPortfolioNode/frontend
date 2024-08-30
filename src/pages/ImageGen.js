import React from 'react';
import InteractionPanel from '../components/InteractionPanel.js';
const ImageGenerator = () => {
    return (
        <div>
            <h1>Welcome to the Image Generation Page</h1>
            <p>Radiate: Don't Reflect!</p>
            <InteractionPanel initialEndpoint={'Image-Generation'} />
        </div>
    );
};

export default ImageGenerator;
