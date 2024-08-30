import React from 'react';
import InteractionPanel from '../components/InteractionPanel';
 
const Chat = () => {
    return (
        <div>
            <h1>Welcome to the Chat Page</h1>
            <p>Radiate: Don't Reflect!</p>
        <InteractionPanel initialEndpoint={'Chat'} />
        </div>
    );
};

export default Chat;
