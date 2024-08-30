import React, { useState } from 'react';

const Header = () => {
    const [activeEndpoint] = useState(''); // Set initial endpoint based on the prop
    const [message, ] = useState('');
    const [file, ] = useState(null);
    const [response, ] = useState('')


    return (
        <header className=".header">
            <nav className="">
                <a  href="/">AI App</a>
                <div className="navbar-nav">
                    <p>{file}<br/>{activeEndpoint}<br/>{message}<br/>{response}<br /></p>
                </div>
            </nav>
        </header>
    );
};

export default Header;
