import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MediaDisplay from './MediaDisplay';

const DisplayArea = ({ response, loading, setLoading }) => {
  const [mainThreadStatus, setMainThreadStatus] = useState({});

  useEffect(() => {
    const fetchMainThreadStatus = async () => {
      try {
        const res = await fetch('/api/main_thread_status');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setMainThreadStatus(data);
      } catch (error) {
        console.error('Error fetching main thread status:', error);
      }
    };

    fetchMainThreadStatus();
    const intervalId = setInterval(fetchMainThreadStatus, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="display-area" style={{ width: '100%', margin: '0 auto' }}>
      <div className="response-section">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <MediaDisplay
            response={response}
            isLoading={loading}
            error={null}
          />
        )}
      </div>
      <div className="main-thread-status">
        <h3>Main Thread Status:</h3>
        <div className="status-info">
          <p>Status: {mainThreadStatus.status}</p>
          <p>Connected Clients: {mainThreadStatus.connected_clients}</p>
          <p>Endpoints: {mainThreadStatus.endpoints ? mainThreadStatus.endpoints.join(', ') : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

DisplayArea.propTypes = {
  response: PropTypes.shape({
    message: PropTypes.string,
    savedpath: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

DisplayArea.defaultProps = {
  response: {
    message: '',
    savedpath: ''
  }
};

export default DisplayArea;
