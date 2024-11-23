import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import '../styles/Concierge.css'; // Import the CSS file

const socket = io('http://localhost:5000', {
  transports: ['websocket'], // Ensure WebSocket transport is used
  reconnectionAttempts: 5, // Retry connection attempts
  reconnectionDelay: 1000 // Delay between reconnection attempts
});

const Concierge = ({ onTaskSubmit }) => {
  const [task, setTask] = useState('');
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState({ status: 'connecting', label: 'Connecting' });
  const [editFile, setEditFile] = useState('');
  const [editContent, setEditContent] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    socket.on('status', (data) => {
      setStatus(data);
    });

    socket.on('taskResult', (data) => {
      setSuccess(data.success);
      onTaskSubmit(task, data.success);
    });

    socket.on('editSuggestion', (data) => {
      setEditFile(data.file);
      setEditContent(data.content);
    });

    socket.on('welcome', (message) => {
      setWelcomeMessage(message);
    });

    // Emit a welcome message when the component mounts
    socket.emit("hello", "world", (val) => { 
      console.log("Server acknowledged the hello message with:", val);
    });
    return () => {
      socket.off('status');
      socket.off('taskResult');
      socket.off('editSuggestion');
      socket.off('welcome');
    };
  }, [task, onTaskSubmit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('submitTask', { task });
  };

  const handleEditConfirm = () => {
    socket.emit('confirmEdit', { file: editFile, content: editContent });
  };

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
          {status.label}{success && ' - Success'}
        </div>
        {editFile && (
          <div className="edit-suggestion">
            <h3>Suggested Edit</h3>
            <p>File: {editFile}</p>
            <pre>{editContent}</pre>
            <button onClick={handleEditConfirm}>Confirm Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

Concierge.propTypes = {
  onTaskSubmit: PropTypes.func.isRequired,
};

export default Concierge;
