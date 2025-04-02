import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MediaDisplay.css';

const MediaDisplay = ({ response = { message: '', savedpath: '' }, isLoading, error }) => {
  if (isLoading) {
    return <div className="media-loading">Loading...</div>;
  }

  if (error) {
    return <div className="media-error alert alert-danger">{error}</div>;
  }

  const renderMedia = () => {
    if (!response.mediaUrl && !response.savedpath) {
      return null;
    }

    const mediaPath = response.mediaUrl || response.savedpath;
    const mediaType = getMediaType(mediaPath);

    switch (mediaType) {
      case 'audio':
        return (
          <audio controls className="media-audio">
            <source src={mediaPath} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      case 'video':
        return (
          <video controls className="media-video">
            <source src={mediaPath} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        );
      case 'image':
        return (
          <img 
            src={mediaPath} 
            alt="Generated content" 
            className="media-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-image.png';
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="media-display">
      {response?.message && (
        <div className="media-text">
          <p>{response.message}</p>
        </div>
      )}
      {renderMedia()}
    </div>
  );
};

const getMediaType = (path) => {
  if (!path) return null;
  if (path.match(/\.(mp3|wav|ogg)$/i)) return 'audio';
  if (path.match(/\.(mp4|webm|ogg)$/i)) return 'video';
  if (path.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return 'image';
  return null;
};

MediaDisplay.propTypes = {
  response: PropTypes.shape({
    message: PropTypes.string,
    mediaUrl: PropTypes.string,
    savedpath: PropTypes.string,
  }),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

MediaDisplay.defaultProps = {
  response: {
    message: '',
    mediaUrl: '',
    savedpath: ''
  },
  error: null
};

export default MediaDisplay;