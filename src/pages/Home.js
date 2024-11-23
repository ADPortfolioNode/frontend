import React from 'react';

import InteractionPanel from '../components/InteractionPanel.js';

const Home = () => {
    const handleSubmit = (e, inputValues, file) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('Form submitted:', inputValues, file);
    };

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>Radiate: Don't Reflect!</p>
            <InteractionPanel initialEndpoint={'Home'} handleSubmit={handleSubmit} />
        </div>
    );
};

export default Home;
