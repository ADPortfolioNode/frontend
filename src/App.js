import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import DisplayArea from './components/DisplayArea';
import InteractivePanel from './components/InteractivePanel';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const App = () => {
  const [response, setResponse] = useState({ message: '', savedpath: '' });
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [conciergeMessage, setConciergeMessage] = useState('');
  const [conciergeResponse, setConciergeResponse] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const socket = io(REACT_APP_API_BASE_URL, {
    transports: ['websocket'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
  });

  useEffect(() => {
    socket.on('taskResult', (data) => setResponse({ message: data.message, savedpath: data.savedpath }));
    return () => socket.off('taskResult');
  }, [socket]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedEndpoint) return; // Add this check to prevent fetching data when selectedEndpoint is null
      try {
        const res = await fetch(`${REACT_APP_API_BASE_URL}/api/endpoints`);
        const data = await res.json();
        if (data && data.endpoints && data.endpoints[selectedEndpoint]) {
          return data.endpoints[selectedEndpoint];
        } else {
          console.error('Selected endpoint not found in data:', selectedEndpoint);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    fetchData();
  }, [selectedEndpoint]);

  const handleConciergeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${REACT_APP_API_BASE_URL}/api/concierge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: conciergeMessage }),
      });
      const data = await res.json();
      setConciergeResponse(data.message);
      setResponse({ message: data.message, savedpath: data.savedpath });
    } catch (error) {
      console.error('Error sending concierge message:', error);
    }
  };

  const handleConciergeKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConciergeSubmit(e);
    }
  };

  return (
    <div className="App container-fluid" style={{ width: '98%' }}>
      <div className="row">
        <div className="col-12 col-md-3">
          <form onSubmit={handleConciergeSubmit} className="concierge-form">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ask the concierge..."
                value={conciergeMessage}
                onChange={(e) => setConciergeMessage(e.target.value)}
                onKeyPress={handleConciergeKeyPress}
              />
              <button className="btn btn-primary" type="submit">
                Send
              </button>
            </div>
          </form>
          {conciergeResponse && (
            <div className="concierge-response">
              <h5>Concierge Response:</h5>
              <p>{conciergeResponse}</p>
            </div>
          )}
        </div>
        <div className="col-12 col-md-6">
          <div className="response-window">
            <DisplayArea response={response} />
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="logo-media-window">
            {response.savedpath ? (
              response.savedpath.endsWith('.mp3') ? (
                <audio controls>
                  <source src={response.savedpath} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <img src={response.savedpath} alt="Response Media" />
              )
            ) : (
              <h1 className="logo">OpenAI API</h1>
            )}
          </div>
        </div>
      </div>
      <div className="grid-container">
        <div className={`grid-item navigation ${isNavOpen ? 'open' : ''}`}>
          <Navigation setSelectedEndpoint={setSelectedEndpoint} />
        </div>
        <div className="grid-item interactive-panel">
          <InteractivePanel
            selectedEndpoint={selectedEndpoint}
            socket={socket}
            loading={loading}
            setLoading={setLoading}
            setResponse={setResponse}
          />
        </div>
      </div>
      <button onClick={toggleNav} className="nav-toggle-btn">
        {isNavOpen ? 'Close Navigation' : 'Open Navigation'}
      </button>
    </div>
  );
};

export default App;
