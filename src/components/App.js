import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Layout from './Layout';
import './styles/App.css';
import InteractivePanel from './InteractivePanel';
import DisplayArea from './DisplayArea';
import { io } from 'socket.io-client';
import Concierge from './api/Concierge';

const App = () => {
  const [endpoints, setEndpoints] = useState({});
  const [selectedEndpoint, setSelectedEndpoint] = useState({ endpoint: '', method: 'GET', formInputs: {} });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ message: '', savedpath: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState({ formInputs: {} });
  const [endpoint, setEndpoint] = useState({ endpoint: '', method: 'GET', formInputs: {} });

  useEffect(() => {
    setActiveTab(selectedEndpoint);
  }, [selectedEndpoint]);

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const response = await fetch('/openai.json');
        const data = await response.json();
        setEndpoints(data['openai_api']);
      } catch (error) {
        console.error('Error fetching endpoints:', error);
      }
    };
    fetchEndpoints();
  }, []);

  const handleNavClick = (endpoint) => {
    setSelectedEndpoint({ ...endpoint, formInputs: endpoint.formInputs || {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse({ message: '', savedpath: '' });
    try {
      const formData = new FormData();
      Object.keys(selectedEndpoint.formInputs).forEach((key) => {
        formData.append(key, e.target[key].value);
      });
      const res = await fetch(`http://localhost:5000${selectedEndpoint.endpoint}`, {
        method: selectedEndpoint.method,
        body: formData,
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Error submitting the form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navigation loading={loading} endpoints={endpoints} onNavClick={handleNavClick} horizontal />
      <Layout handleSubmit={handleSubmit} loading={loading} activeTab={activeTab} />
      <InteractivePanel />
    </div>
  );
};

export default App;