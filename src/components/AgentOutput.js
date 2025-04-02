import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const DisplayArea = ({ response }) => {
  const [mainThreadStatus, setMainThreadStatus] = useState({});
  const [messageThread, setMessageThread] = useState([]);
  const scrollableRef = useRef(null);

  useEffect(() => {
    const fetchMainThreadStatus = async () => {
      try {
        const res = await fetch('/api/main_thread_status');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setMainThreadStatus(data);
      } catch (error) {
        console.error('Error fetching main thread status:', error);
      }
    };

    fetchMainThreadStatus();
  }, []);

  useEffect(() => {
    // Simulate receiving new messages
    const newMessage = `Message ${messageThread.length + 1}: This is a new message from the main thread.`;
    setMessageThread((prevThread) => [...prevThread, newMessage]);
  }, []); // Simulate new messages

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [messageThread]);

  const renderMedia = (savedpath) => {
    if (!savedpath) return null;

    if (savedpath.endsWith('.mp3')) {
      return (
        <audio controls>
          <source src={savedpath} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    } else if (savedpath.endsWith('.mp4')) {
      return (
        <video controls className="w-100">
          <source src={savedpath} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      );
    } else if (savedpath.endsWith('.png') || savedpath.endsWith('.jpg') || savedpath.endsWith('.jpeg')) {
      return <img src={savedpath} alt="Response Media" className="img-fluid" />;
    } else {
      return <p>Unsupported media type.</p>;
    }
  };

  return (
    <div className="display-area">
      <h3>Response Message:</h3>
      <p>{response.message}</p>
      {response.savedpath && (
        <div>
          <h3>Saved Path:</h3>
          {renderMedia(response.savedpath)}
        </div>
      )}

      <div className="main-thread-status">
        <h3>Main Thread Status:</h3>
        <div className="status-info">
          <p>Status: {mainThreadStatus.status}</p>
          <p>Connected Clients: {mainThreadStatus.connected_clients}</p>
          <p>Endpoints: {mainThreadStatus.endpoints ? mainThreadStatus.endpoints.join(', ') : 'N/A'}</p>
        </div>
        <div className="message-thread" style={{ height: '100px', overflowY: 'scroll' }} ref={scrollableRef}>
          {messageThread.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

DisplayArea.propTypes = {
  response: PropTypes.shape({
    message: PropTypes.string.isRequired,
    savedpath: PropTypes.string,
  }).isRequired,
};

export default DisplayArea;
