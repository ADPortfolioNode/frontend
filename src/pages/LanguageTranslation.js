import React from 'react';

import InteractionPanel from '../components/InteractionPanel';
const LanguageTranslation = () => {
    return (
        <div>
            <h1>Welcome to the Language Translation Page</h1>
            <p>Radiate: Don't Reflect!</p>
             <InteractionPanel initialEndpoint={'Speech-to-Text'} />
        </div>
    );
};

export default LanguageTranslation;
