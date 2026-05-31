import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Import theme initializer
import './main';

// Initialize shop script after React mounts
import { initShop } from './script';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  // call initShop after a tick so DOM is rendered
  setTimeout(() => {
    initShop().catch(() => {});
  }, 0);
}
