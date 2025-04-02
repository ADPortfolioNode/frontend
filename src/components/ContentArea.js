import React, { useState, useEffect } from 'react';
 import DisplayArea from './DisplayArea';
import Chat from './Chat';

const ContentArea = () => {
  const [response, setResponse] = useState({ message: '', savedpath: '' });
  const [status, setStatus] = useState({ status: 'connecting', label: 'Connecting' });
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [task, setTask] = useState('');
  const [editFile, setEditFile] = useState('');
  const [editContent, setEditContent] = useState('');

  const socket = io('http://localhost:5000', {
    transports: ['websocket'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
  });

  useEffect(() => {
    const handleStatus = (data) => setStatus(data);
    const handleTaskResult = (data) => setResponse({ message: data.message, savedpath: data.savedpath });
    const handleWelcome = (message) => setWelcomeMessage(message);
    const handleResponse = (data) => {
      setResponse(data);
      window.scrollTo(0, document.body.scrollHeight);
    };

    socket.on('status', handleStatus);
    socket.on('taskResult', handleTaskResult);
    socket.on('welcome', handleWelcome);
    socket.on('response', handleResponse);

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setStatus({ status: 'error', label: 'WebSocket connection failed. Please try again later.' });
    });

    socket.on('editSuggestion', (data) => {
      setEditFile(data.file);
      setEditContent(data.content);
    });

    socket.emit("hello", "world", (val) => {
      console.log("Server acknowledged the hello message with:", val);
    });

    return () => {
      socket.close();
      socket.off('status', handleStatus);
      socket.off('taskResult', handleTaskResult);
      socket.off('welcome', handleWelcome);
      socket.off('response', handleResponse);
      socket.off('editSuggestion');
    };
  }, [socket]);

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    socket.emit('submitTask', { task });
  };

  const handleEditConfirm = () => {
    socket.emit('confirmEdit', { file: editFile, content: editContent });
  };

  return (
    <div className="content-area white-background">
      <DisplayArea response={response} />
      
      <div className="concierge-container">
        <div className="concierge">
          <h2>Concierge Assistant</h2>
          {welcomeMessage && <p>{welcomeMessage}</p>}
          <form onSubmit={handleTaskSubmit}>
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
    </div>
  );
};

export default ContentArea;
