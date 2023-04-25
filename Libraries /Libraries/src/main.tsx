import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from 'src/components/errors/ErrorBoundary';

import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
