import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const onTaskSubmit = (task) => {
  console.log('Task submitted:', task);
};

const endpoint = '/api/chat';

root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <App onTaskSubmit={onTaskSubmit} endpoint={endpoint} />
    </Provider>
  </ErrorBoundary>
);