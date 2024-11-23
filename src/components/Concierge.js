import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DisplayArea from './DisplayArea';
import '../styles/Concierge.css';

const Concierge = ({ socket, onTaskSubmit, onResponse, loading, status, welcomeMessage }) => {
  const [task, setTask] = useState('');
  const [response, setResponse] = useState({ message: '', savedpath: '' });

  useEffect(() => {
    if (!socket) return;

    const handleTaskResult = (data) => {
      setResponse(data);
      onTaskSubmit(task, data.success);
    };
    const handleResponse = (data) => {
      setResponse(data);
      onResponse(data);
    };

    socket.on('taskResult', handleTaskResult);
    socket.on('response', handleResponse);

    return () => {
      socket.off('taskResult', handleTaskResult);
      socket.off('response', handleResponse);
    };
  }, [socket, task, onTaskSubmit, onResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
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
        <DisplayArea response={response.message} savedpath={response.savedpath} />
      </div>
    </div>
  );
};

Concierge.propTypes = {
  socket: PropTypes.object,
  onTaskSubmit: PropTypes.func.isRequired,
  onResponse: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  status: PropTypes.object.isRequired,
  welcomeMessage: PropTypes.string.isRequired,
};

export default Concierge;