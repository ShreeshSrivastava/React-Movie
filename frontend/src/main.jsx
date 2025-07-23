import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MovieProvider } from './contexts/MovieContext'; // ✅ Adjust the path if needed
import './css/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MovieProvider> {/* ✅ Now context will be available */}
        <App />
      </MovieProvider>
    </BrowserRouter>
  </StrictMode>
);
