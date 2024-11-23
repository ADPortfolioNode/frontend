import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <div className="header">
        <img src="http://localhost:5000/images/yinyang.gif" alt="Logo" className="logo" />
        <h1 className="site-title">AI App</h1>
      </div>
    )
  );
};

export default Header;
