import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import '../styles/InteractivePanel.css';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const REACT_APP_OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const InteractivePanel = ({ selectedEndpoint, loading, setLoading, setResponse }) => {
  const [formInputs, setFormInputs] = useState({});
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (selectedEndpoint && selectedEndpoint.form_inputs) {
      setFormInputs(selectedEndpoint.form_inputs);
      
      const initialFormValues = Object.keys(selectedEndpoint.form_inputs).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {});
      initialFormValues.model = selectedEndpoint.model; // Set the model value
      setFormValues(initialFormValues);
    }
  }, [selectedEndpoint]);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socketUrl = `${protocol}://${new URL(REACT_APP_API_BASE_URL).host}`;
    const socket = io(socketUrl, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    const handleTaskResult = (data) => {
      setResponse(data);
      setLoading(false);
    };

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    socket.on('taskResult', handleTaskResult);

    return () => {
      socket.off('taskResult', handleTaskResult);
      socket.close();
    };
  }, [setResponse, setLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${REACT_APP_API_BASE_URL}${selectedEndpoint.endpoint}`, {
      method: selectedEndpoint.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setResponse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error submitting task:', err);
        setLoading(false);
      });
  };

  if (!selectedEndpoint) {
    return <p>Please select an endpoint from the navigation menu.</p>;
  }

  return (
    <div className="interactive-panel">
      <h2>{selectedEndpoint.description}</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formInputs).map((key) => (
          <div key={key} className="form-group">
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={formValues[key]}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

InteractivePanel.propTypes = {
  selectedEndpoint: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setResponse: PropTypes.func.isRequired,
};

export default InteractivePanel;