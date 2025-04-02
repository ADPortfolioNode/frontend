import React, { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="header-container">
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide Header' : 'Show Header'}
      </button>
      {isVisible && (
        <div className="header">
          <img src="http://localhost:5000/images/yinyang.gif" alt="Logo" className="logo" />
          <h1 className="site-title">AI App</h1>
        </div>
      )}
    </div>
  );
};

export default Header;
