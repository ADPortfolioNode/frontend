import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../styles/Concierge.css';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const Concierge = ({ onTaskSubmit, onResponse, loading, status }) => {
  const [task, setTask] = useState('');
  const [threads, setThreads] = useState([{ id: 'main', name: 'Main Thread', graphic: '' }]);
  const [socket, setSocket] = useState(null);
  const [buttonColor, setButtonColor] = useState('btn-primary');
  const navigate = useNavigate();

  useEffect(() => {
    const socketInstance = io(REACT_APP_API_BASE_URL, { path: '/socket.io' });
    setSocket(socketInstance);

    socketInstance.on('threadUpdate', (updatedThread) => {
      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread.id === updatedThread.id ? { ...thread, graphic: updatedThread.graphic } : thread
        )
      );
      if (updatedThread.id === 'main') {
        setButtonColor('btn-danger'); // Change button color on update
      }
      console.log('Thread updated:', updatedThread);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const newThread = { id: `thread-${Date.now()}`, name: `Task: ${task}`, graphic: '' };
    setThreads((prevThreads) => [...prevThreads, newThread]);

    socket.emit('submitTask', { task, threadId: newThread.id });
    setTask('');
  };

  const handleButtonClick = () => {
    setButtonColor('btn-primary'); // Reset button color
    navigate('/assistants');
  };

  const renderThreads = () =>
    threads.map((thread) => (
      <div key={thread.id} className="thread">
        <h4>{thread.name}</h4>
        <div className="thread-graphic" dangerouslySetInnerHTML={{ __html: thread.graphic }} />
      </div>
    ));

  return (
    <div className="concierge-container">
      <h2>Concierge</h2>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Task'}
        </button>
      </form>
      <button
        className={`btn ${buttonColor} mt-3`}
        onClick={handleButtonClick}
        disabled={loading}
      >
        View Threads
      </button>
      <div className="threads-container">{renderThreads()}</div>
      <div className={`status-indicator ${status.status}`}>
        {status.label}
      </div>
    </div>
  );
};

Concierge.propTypes = {
  onTaskSubmit: PropTypes.func.isRequired,
  onResponse: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  status: PropTypes.object.isRequired,
};

export default Concierge;