import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import About from './pages/About';
import Chat from './pages/Chat';
import Assistants from './pages/Assistants';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [threads] = useState([{ id: 'main', name: 'Main Thread', messages: [] }]);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [response, setResponse] = useState({ message: '', savedpath: '' }); // Add response state

  return (
    <Router>
      <ErrorBoundary>
        <div className="App">
          <Header />
          <NavigationBar setSelectedEndpoint={setSelectedEndpoint} />
          <div className="container main-content">
            <div className="row">
              <div className="col-md-12">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        loading={loading}
                        setLoading={setLoading}
                        selectedEndpoint={selectedEndpoint}
                        response={response} // Pass response to Home
                        setResponse={setResponse} // Pass setResponse to Home
                      />
                    }
                  />
                  <Route path="/search" element={<Search />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/assistants" element={<Assistants threads={threads} />} />
                </Routes>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
