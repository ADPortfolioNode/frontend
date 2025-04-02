import React from 'react';
import PropTypes from 'prop-types';
import InteractivePanel from '../components/InteractivePanel';
import DisplayArea from '../components/DisplayArea';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ loading, setLoading, selectedEndpoint, response, setResponse }) => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/chat');
  };

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Agentic RAG Workstation</h1>
          <p>Empowering Digital Media Creators with Intelligent Automation</p>
          <button className="btn btn-primary" onClick={handleGetStartedClick}>Get Started</button>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Intelligent Automation</h3>
          <p>Automate repetitive tasks and focus on creative work.</p>
        </div>
        <div className="feature">
          <h3>RAG-Powered Insights</h3>
          <p>Leverage retrieval-augmented generation for informed decision-making.</p>
        </div>
        <div className="feature">
          <h3>Seamless Integration</h3>
          <p>Integrate with your existing tools and workflows.</p>
        </div>
      </section>

      <section className="interactive">
        <h2>Start Interacting</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 float-left">
              <InteractivePanel
                loading={loading}
                setLoading={setLoading}
                selectedEndpoint={selectedEndpoint}
                setResponse={setResponse}
              />
            </div>
            <div className="col-md-8 float-left">
              <DisplayArea
                loading={loading}
                setLoading={setLoading}
                response={response}
                setResponse={setResponse}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  selectedEndpoint: PropTypes.object,
  response: PropTypes.object,
  setResponse: PropTypes.func.isRequired,
};

export default Home;
