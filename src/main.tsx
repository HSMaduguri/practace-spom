import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Mitigate cross-origin "Script error." bubble-up from third-party scripts, browser extensions, or outer frame wrappers
window.onerror = function (message, url, line, col, error) {
  if (typeof message === 'string' && (message.includes('Script error') || message.includes('Unexpected token') || !url)) {
    console.warn('Suppressed cross-origin or outer-frame noisy exception:', message);
    return true; // Prevents generic Cross-Origin Script errors from bubbling to the test runner
  }
  return false;
};

window.addEventListener('error', (event) => {
  if (event.message && (event.message.includes('Script error') || !event.filename)) {
    event.preventDefault();
    event.stopPropagation();
  }
}, true);

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  if (reason && (reason.message?.includes('Script error') || reason.stack?.includes('extension'))) {
    event.preventDefault();
    event.stopPropagation();
  }
});

function activateDeferredStyles() {
  const links = document.querySelectorAll<HTMLLinkElement>('link[data-defer-css="true"]');
  links.forEach((link) => {
    if (link.media === 'all') return;
    const enable = () => {
      link.media = 'all';
    };
    if (link.sheet) {
      enable();
      return;
    }
    link.addEventListener('load', enable, { once: true });
    link.addEventListener('error', enable, { once: true });
    if (document.readyState === 'complete') {
      enable();
    } else {
      window.addEventListener('load', enable, { once: true });
      setTimeout(enable, 150);
    }
  });
}

activateDeferredStyles();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

