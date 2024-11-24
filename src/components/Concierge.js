import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import '../styles/Concierge.css';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const REACT_APP_OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const Concierge = ({ onTaskSubmit, onResponse, loading, status, welcomeMessage }) => {
  const [task, setTask] = useState('');
  const [response, setResponse] = useState({ message: '', savedpath: '' });

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
      onTaskSubmit(task, data.success);
    };
    const handleResponse = (data) => {
      setResponse(data);
      onResponse(data);
    };

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    socket.on('taskResult', handleTaskResult);
    socket.on('conciergeResponse', handleResponse);

    return () => {
      socket.off('taskResult', handleTaskResult);
      socket.off('conciergeResponse', handleResponse);
      socket.close();
    };
  }, [task, onTaskSubmit, onResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${REACT_APP_API_BASE_URL}/concierge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ message: task }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setResponse(data);
        onTaskSubmit(task, data.success);
      })
      .catch((err) => console.error('Error submitting task:', err));
  };

  if (loading) {
    return <div><img src={'http://localhost:5000/images/yinyang.gif'} alt="loading..." /></div>;
  }

  return (
    <div className="concierge-container">
      <div className="concierge">
        <h2>Concierge Assistant</h2>
        {welcomeMessage && <p>{welcomeMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task"
          />
          <button type="submit">Submit Task</button>
        </form>
        <div className={`status-indicator ${status.status}`}>
          {status.label}
        </div>
        {response.message && (
          <div className="response">
            <h3>Response</h3>
            <p>{response.message}</p>
            {response.savedpath && (
              <>
                <h4>Saved Path</h4>
                <p>{response.savedpath}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Concierge.propTypes = {
  onTaskSubmit: PropTypes.func.isRequired,
  onResponse: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  status: PropTypes.object.isRequired,
  welcomeMessage: PropTypes.string.isRequired,
};

export default Concierge;