import React from 'react';

import InteractionPanel from '../components/InteractionPanel.js';
const TextSummarizations = () => {
    return (
        <div>
            <h1>Welcome to the Text Summarization Page</h1>
            <p>Radiate: Don't Reflect!</p>
            <InteractionPanel initialEndpoint={'Text-to-Speech'} />
        </div>
    );
};

export default TextSummarizations;
