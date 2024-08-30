import React from 'react';

import InteractionPanel from '../components/InteractionPanel.js';
const Home = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>Radiate: Don't Reflect!</p>
            <InteractionPanel initialEndpoint={'Home'} />
        </div>
    );
};

export default Home;
