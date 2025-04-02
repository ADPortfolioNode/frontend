import React from 'react';
import PropTypes from 'prop-types';

const Assistants = ({ threads = [] }) => {
  const renderThreadTree = (thread) => (
    <div key={thread.id} className="thread">
      <h4>{thread.name}</h4>
      <div className="thread-messages">
        {thread.messages && thread.messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      {thread.children && thread.children.map(renderThreadTree)}
    </div>
  );

  return (
    <div className="assistants-page" style={{ width: '100%', height: '100vh', overflowY: 'auto' }}>
      <h1>Assistant Threads</h1>
      {threads && threads.map(renderThreadTree)}
    </div>
  );
};

Assistants.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.array,
  })),
};

Assistants.defaultProps = {
  threads: []
};

export default Assistants;
