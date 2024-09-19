import React, { useState, useEffect } from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './MediaDisplay.css'; // Import the CSS file for transitions

const MediaDisplay = ({ response = {}, isLoading, error = '' }) => {
  const { message, mediaUrl } = response;
  const [displayMessage, setDisplayMessage] = useState('');
  const [displayMediaUrl, setDisplayMediaUrl] = useState('');
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    setDisplayMessage(message || '');
    setDisplayMediaUrl(mediaUrl || '');
    setMediaError(false);
  }, [message, mediaUrl]);

  const handleMediaError = (e) => {
    if (!mediaError) {
      console.error('Media failed to load:', displayMediaUrl);
      setMediaError(true);
      e.target.onerror = null; // Prevent infinite loop
      e.target.src = 'http://localhost:5000/images/yinyang.png'; // Provide a fallback image
    }
  };

  const renderMedia = () => {
    if (typeof displayMediaUrl !== 'string') {
      return null;
    }

    if (displayMediaUrl.endsWith('.mp3')) {
      return (
        <audio controls className="w-100 visible">
          <source src={displayMediaUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    } else if (displayMediaUrl.endsWith('.mp4')) {
      return (
        <video controls className="w-100 visible">
          <source src={displayMediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (displayMediaUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
      return (
        <img
          src={displayMediaUrl}
          alt="Generated content"
          className="img-fluid rounded visible"
          onError={handleMediaError}
        />
      );
    } else {
      return (
        <Alert variant="warning">
          Unsupported type. <a href={displayMediaUrl} target="_blank" rel="noopener noreferrer">Click here</a> to view the file.
        </Alert>
      );
    }
  };

  return (
    <Card className={`shadow-sm h-100 ${!displayMessage && !displayMediaUrl && !isLoading && !error ? 'hidden' : ''}`}>
      <Card.Body>
        <Card.Title className="text-center mb-4">Result</Card.Title>
        {isLoading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Processing your request...</p>
          </div>
        )}
        {error && !isLoading && (
          <Alert variant="danger">
            <strong>Error:</strong> {error}{mediaError && ' (Media failed to load)'}
          </Alert>
        )}
        {displayMessage && !isLoading && !error && (
          <Card.Text className={`response-text ${displayMessage ? 'visible' : ''}`}>{displayMessage}</Card.Text>
        )}
        {displayMediaUrl && !isLoading && !error && (
          <div className="media-container mt-4">
            {renderMedia()}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

MediaDisplay.propTypes = {
  response: PropTypes.shape({
    message: PropTypes.string,
    mediaUrl: PropTypes.string,
  }),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default MediaDisplay;