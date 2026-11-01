import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tokens.css';
import App from './App';

// CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slide-in-right { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
  .animate-slide-in-right { animation: slide-in-right 0.25s ease-out forwards; }
  .animate-scale-in { animation: scale-in 0.15s ease-out forwards; }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
