import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InteractivePanel = ({ activeEndpoint, handleSubmit, input, setInput, file, setFile, loading }) => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title className="text-center mb-4">{activeEndpoint.charAt(0).toUpperCase() + activeEndpoint.slice(1)}</Card.Title>
        <Form onSubmit={handleSubmit}>
          {['chat', 'tts', 'imggen'].includes(activeEndpoint) && (
            <Form.Group controlId="formInput">
              <Form.Label>Input</Form.Label>
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your message or prompt"
              />
            </Form.Group>
          )}
          {['transcribe', 'translate', 'imgEdit', 'imgVariation', 'vtt'].includes(activeEndpoint) && (
            <Form.Group controlId="formFile">
              <Form.Label>File</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          )}
          {activeEndpoint === 'imgEdit' && (
            <Form.Group controlId="formEditInstructions">
              <Form.Label>Edit Instructions</Form.Label>
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter edit instructions"
              />
            </Form.Group>
          )}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

InteractivePanel.propTypes = {
  activeEndpoint: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  file: PropTypes.object,
  setFile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default InteractivePanel;