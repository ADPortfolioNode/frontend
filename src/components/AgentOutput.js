import React from 'react';
import PropTypes from 'prop-types';
import './ContentArea.css';

const AgentOutput = ({ threads }) => {
  return (
    <div className="agent-output">
      <h2>Agent Output</h2>
      {threads.length === 0 ? (
        <p>No threads available.</p>
      ) : (
        <ul>
          {threads.map((thread, index) => (
            <li key={index}>
              <strong>{thread.title}</strong>
              <p>{thread.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

AgentOutput.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AgentOutput;
