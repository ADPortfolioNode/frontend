import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/InteractivePanel.css';

const InteractivePanel = ({ selectedEndpoint, socket, loading, setLoading, setResponse }) => {
  const [formInputs, setFormInputs] = useState({});
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (selectedEndpoint && selectedEndpoint.form_inputs) {
      setFormInputs(selectedEndpoint.form_inputs);
      
      const initialFormValues = Object.keys(selectedEndpoint.form_inputs).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {});
      initialFormValues.model = selectedEndpoint.model; // Set the model value
      setFormValues(initialFormValues);
    }
  }, [selectedEndpoint]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket && formInputs) {
      setLoading(true);
      socket.emit('submitTask', { endpoint: selectedEndpoint.endpoint, data: formValues }, (response) => {
        setResponse(response); // Raise the response to the state
        setLoading(false);
      });
    }
  };

  if (!formInputs || Object.keys(formInputs).length === 0) {
    return <p>Please select an endpoint from the navigation menu.</p>;
  }
  console.log('InteractivePanel Selected Endpoint:', selectedEndpoint); // Log the selected endpoint for debugging

  const getLabel = (key) => {
    switch (key) {
      case 'prompt':
        return 'Prompt';
      case 'file':
        return 'File';
      case 'image':
        return 'Image File';
      case 'video':
        return 'Video File';
      case 'number':
        return 'Number of Images';
      case 'model':
        return 'Model';
      default:
        return key;
    }
  };

  return (
    <div className="interactive-panel">
      {selectedEndpoint.description && <h2>{selectedEndpoint.description}</h2>}
      <form onSubmit={handleSubmit}>
        {Object.keys(formInputs).map((key, index) => (
          <div key={index} className="form-group">
            <label>{getLabel(key)}</label>
            {key === 'model' ? (
              <select
                name={key}
                value={formValues[key]}
                onChange={handleInputChange}
                className="form-control"
                disabled
              >
                <option value={selectedEndpoint.model}>{selectedEndpoint.model}</option>
              </select>
            ) : (
              <input
                type={formInputs[key]}
                name={key}
                value={formValues[key] || ''}
                onChange={handleInputChange}
                className="form-control"
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

InteractivePanel.propTypes = {
  selectedEndpoint: PropTypes.object,
  socket: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setResponse: PropTypes.func.isRequired, // Add setResponse prop type
};

export default InteractivePanel;