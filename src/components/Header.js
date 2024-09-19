import React, { useState } from 'react';
import './Header.css'

const Header = () => {
    const [activeEndpoint] = useState('Home'); // Set initial endpoint based on the prop
    const [message, ] = useState('hello Ai');
    const [file, ] = useState(null);
    const [response, ] = useState('')


    return (
        <header className=".header">
            <nav className="">
                <a  href="/">AI App</a>
                <div className="navbar-nav">
                    <p>{file}<br/>{activeEndpoint}<br /></p>
                </div>
            </nav>
        </header>
    );
};

export default Header;
