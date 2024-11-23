import React from 'react';
import PropTypes from 'prop-types';

const MediaDisplay = ({ response, isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (response.mediaUrl) {
    return (
      <div>
        <h3>Response</h3>
        <p>{response.message}</p>
        <img src={response.mediaUrl} alt="Generated content" className="img-fluid" />
      </div>
    );
  }

  return (
    <div>
      <h3>Response</h3>
      <p>{response.message}</p>
    </div>
  );
};

MediaDisplay.propTypes = {
  response: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default MediaDisplay;