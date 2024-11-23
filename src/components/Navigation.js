import React, { useState } from 'react';
import openaiData from '../data/openai.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const Navigation = ({ setSelectedEndpoint }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleEndpointClick = (endpoint, parentModel) => {
    setSelectedEndpoint({ ...endpoint, model: parentModel });
    setSelectedCategory(null); // Close the menu
    console.log('Navigation Selected Endpoint:', endpoint); // Log the selected endpoint for debugging
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <h1><span className="navbar-brand logo">OpenAI API</span></h1>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {Object.keys(openaiData.openai_api).map((category) => (
              <li className="nav-item dropdown" key={category}>
                <button className="nav-link dropdown-toggle" id={`navbarDropdown-${category}`} data-bs-toggle="dropdown" aria-expanded={selectedCategory === category} onClick={() => handleCategoryClick(category)}>
                  {category}
                </button>
                {selectedCategory === category && (
                  <ul className="dropdown-menu show" aria-labelledby={`navbarDropdown-${category}`}>
                    {Object.keys(openaiData.openai_api[category]).map((endpointKey) => (
                      <li key={endpointKey}>
                        <button className="dropdown-item" onClick={() => handleEndpointClick(openaiData.openai_api[category][endpointKey], category)}>
                          {openaiData.openai_api[category][endpointKey].description}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  setSelectedEndpoint: PropTypes.func.isRequired,
};

export default Navigation;
