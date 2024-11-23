import React from 'react';
import InteractivePanel from './InteractivePanel';
import DisplayArea from './DisplayArea';
import Chat from './Chat';
import '../styles/Layout.css'; // Correct the path

const Layout = ({ handleSubmit, loading, activeTab, response }) => { // Add response prop
  return (
    <div className="layout-container">
      <main className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <InteractivePanel initialEndpoint={'Default'} handleSubmit={handleSubmit} loading={loading} activeTab={activeTab} />
            </div>
            <div className="col-md-8 display-area">
              <DisplayArea response={response} /> {/* Pass response prop */}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 chat-area">
              <Chat />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-white text-center p-3">
        <p>&copy; 2024 ADPortfolioNode OpenAI API Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;