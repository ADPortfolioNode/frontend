import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import taskData from '../data/tasks.json'; // Import task data
import PropTypes from 'prop-types';

const NavigationBar = ({ setSelectedEndpoint }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleTaskClick = (task) => {
    setSelectedEndpoint(task);
    setSelectedCategory(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Agentic RAG</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chat">Chat</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/assistants">Assistants</Link>
            </li>
            {Object.keys(taskData.tasks).map((category) => (
              <li className="nav-item dropdown" key={category}>
                <button
                  className="nav-link dropdown-toggle"
                  id={`navbarDropdown-${category}`}
                  data-bs-toggle="dropdown"
                  aria-expanded={selectedCategory === category}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
                {selectedCategory === category && (
                  <ul className="dropdown-menu show" aria-labelledby={`navbarDropdown-${category}`}>
                    {taskData.tasks[category].map((task) => (
                      <li key={task.name}>
                        <button className="dropdown-item" onClick={() => handleTaskClick(task)}>
                          {task.name}
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

NavigationBar.propTypes = {
  setSelectedEndpoint: PropTypes.func.isRequired,
};

export default NavigationBar;
