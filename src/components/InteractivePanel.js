import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/InteractivePanel.css';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const InteractivePanel = ({ selectedEndpoint, loading, setLoading, setResponse }) => {
  const [formInputs, setFormInputs] = useState({});
  const [formValues, setFormValues] = useState({});
  const [file, setFile] = useState(null);
  const [endpoints, setEndpoints] = useState([]);
  const [error, setError] = useState(''); // Add error state

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const res = await fetch(`${REACT_APP_API_BASE_URL}/api/openai.json`);
        if (!res.ok) {
          throw new Error('Failed to fetch endpoints');
        }
        const data = await res.json();
        setEndpoints(data.endpoints);
      } catch (err) {
        console.error('Error fetching endpoints:', err);
        setError('Failed to load endpoints.'); // Set error message
      }
    };

    fetchEndpoints();
  }, []);

  useEffect(() => {
    if (selectedEndpoint && selectedEndpoint.formInputs) {
      setFormInputs(selectedEndpoint.formInputs);

      const initialFormValues = Object.keys(selectedEndpoint.formInputs).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {});
      setFormValues(initialFormValues);
      setError(''); // Clear any previous errors
    }
  }, [selectedEndpoint]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors
    try {
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });
      if (file) {
        formData.append('file', file); // Use 'file' instead of 'documents'
      }

      const res = await fetch(`${REACT_APP_API_BASE_URL}${selectedEndpoint.path}`, {
        method: selectedEndpoint.method,
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);

      // Clear form inputs
      setFormValues({});
      setFile(null);
    } catch (err) {
      console.error('Error submitting task:', err);
      setError(`Error submitting task: ${err.message}`); // Set error message
      setResponse({ message: '', savedpath: '' }); // Clear previous response
    } finally {
      setLoading(false);
    }
  };

  if (!selectedEndpoint) {
    return (
      <div className="interactive-panel-placeholder w-100">
        <h3>Select an Endpoint</h3>
        <ul>
          {endpoints.map((endpoint) => (
            <li key={endpoint.path}>
              <button
                className="btn btn-link"
                onClick={() => setFormInputs(endpoint.parameters)}
              >
                {endpoint.name}
              </button>
            </li>
          ))}
        </ul>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      </div>
    );
  }

  return (
    <div className="interactive-panel w-100">
      <h2 className="interactive-panel-title">{selectedEndpoint.name}</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="row g-3">
        {Object.keys(formInputs).map((key) => (
          key === 'file' ? (
            <div className="col-12" key={key}>
              <label htmlFor={key} className="form-label">Upload File</label>
              <input
                type="file"
                name={key}
                onChange={handleFileChange}
                className="form-control file-input"
                id={key}
              />
            </div>
          ) : (
            <div className="col-12" key={key}>
              <label htmlFor={key} className="form-label">{formInputs[key]}</label>
              <input
                type="text"
                name={key}
                value={formValues[key] || ''} // Handle undefined formValues
                onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
                className="form-control"
                id={key}
              />
            </div>
          )
        ))}
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

InteractivePanel.propTypes = {
  selectedEndpoint: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setResponse: PropTypes.func.isRequired,
};

export default InteractivePanel;
