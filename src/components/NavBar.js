import React from 'react';

const NavBar = ({ onEndpointChange }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">AI App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <button className="nav-link btn" onClick={() => onEndpointChange('Home')}>
                    Home</button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn" onClick={() => onEndpointChange('Chat')}>
                    Chat</button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn" onClick={() => onEndpointChange('Image-Generation')}>
                    Image Generation</button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn" onClick={() => onEndpointChange('Image-Editing')}>
                    Image Editing</button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn" onClick={() => onEndpointChange('Speech-to-Text')}>
                    Speech to Text</button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn" onClick={() => onEndpointChange('Text-to-Speech')}>
                    Text to Speech</button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn" onClick={() => onEndpointChange('Video-to-Text')}>
                    Video to Text</button>
            </li>
            </ul>
        </div>
        </nav>
    );
};

export default NavBar;
