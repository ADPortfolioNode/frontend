import React from 'react';

import InteractionPanel from '../components/InteractionPanel';
const VideoAnalysis = () => {
    return (
        <div>
            <h1>Welcome to the Video Analysis Page</h1>
            <p>Radiate: Don't Reflect!</p>
            <InteractionPanel initialEndpoint={'Video-to-Text'} />
        </div>
    );
};

export default VideoAnalysis;
