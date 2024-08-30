import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Not Found</h1>
            <p>Sorry, the page you are looking for is not found.</p>
            <p>
                You can go back to the <Link to="/">home page</Link>
                 or check out our <Link to="/chat">chat</Link> or 
                 <Link to="/speech">speech</Link> sections.
            </p>
        </div>
    );
};

export default NotFound;
