import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-dark text-white p-3">
                <h1 className="text-center"><Link className="nav-link" to="/">sar~Ai~ne AI Application</Link></h1>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            
                            
                        <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/chat">Chat</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/imggen">Image Generation</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/transcribe">STT Transcribe</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/translate">STT Translate</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/vtt">Video to text</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/vtt">Video to text</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="flex-fill d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 chat-area">
                            {children}
                        </div>
                        <div className="col-md-8 video-area ">
                            {/* Video/Image display area */}
                            <div className="display-area">
                                <h2>Video/Image Display Area</h2>
                                {/* Add your video/image component here */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-dark text-white text-center p-3">
                <p>&copy; 2024 ADPortfolioNode OpenAI API Application. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
