import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initRouter } from './router';

initRouter();

const container = document.getElementById('root');
if (!container) throw new Error('Missing #root — the Apps Script template did not render.');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
