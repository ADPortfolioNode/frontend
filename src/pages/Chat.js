import React, { useState } from 'react';
import Concierge from '../components/Concierge';

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ status: 'idle', label: 'Idle' });

  const handleTaskSubmit = (task) => {
    console.log('Task submitted:', task);
    setStatus({ status: 'pending', label: 'Submitting...' });
    setLoading(true);
    setTimeout(() => {
      setStatus({ status: 'completed', label: 'Completed' });
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <h1>Welcome to the Chat Page</h1>
      <p>Radiate: Don't Reflect!</p>
      <Concierge
        onTaskSubmit={handleTaskSubmit}
        loading={loading}
        status={status}
      />
    </div>
  );
};

export default Chat;
