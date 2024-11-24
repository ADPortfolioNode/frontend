import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import DisplayArea from './components/DisplayArea';
import InteractivePanel from './components/InteractivePanel';
import Concierge from './components/Concierge';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const REACT_APP_OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

if (!REACT_APP_OPENAI_API_KEY) {
  console.error('REACT_APP_OPENAI_API_KEY is not defined. Please set it in your environment variables.');
} else {
  console.log(`Using OpenAI API Key: ${REACT_APP_OPENAI_API_KEY}`);
}

const App = () => {
  const [response, setResponse] = useState({ message: '', savedpath: '' });
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch(`${REACT_APP_API_BASE_URL}/`);
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedEndpoint) return;
      try {
        const res = await fetch(`${REACT_APP_API_BASE_URL}/api/endpoint`);
        const data = await res.json();
        if (data && data.openai_api && data.openai_api[selectedEndpoint]) {
          return data.openai_api[selectedEndpoint];
        } else {
          console.error('Selected endpoint not found in data:', selectedEndpoint);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    fetchData();
  }, [selectedEndpoint]);

  return (
    <div className="App container-fluid" style={{ width: '98%' }}>
      <div className="grid-container">
        <div className={`grid-item navigation ${isNavOpen ? 'open' : ''}`}>
          <Navigation setSelectedEndpoint={setSelectedEndpoint} />
        </div>
        <div className="grid-item interactive-panel">
          <Concierge
            onTaskSubmit={(task, success) => console.log(`Task submitted: ${task}, success: ${success}`)}
            onResponse={(data) => setResponse(data)}
            loading={loading}
            status={{ status: 'idle', label: 'Idle' }}
            welcomeMessage="Welcome to the Concierge Service!"
          />
          <InteractivePanel
            selectedEndpoint={selectedEndpoint}
            loading={loading}
            setLoading={setLoading}
            setResponse={setResponse}
          />
        </div>
        <div className="grid-item display-area">
          <DisplayArea response={response} />
        </div>
      </div>
      <button onClick={toggleNav} className="nav-toggle-btn">
        {isNavOpen ? 'Close Navigation' : 'Open Navigation'}
      </button>
    </div>
  );
};

export default App;
