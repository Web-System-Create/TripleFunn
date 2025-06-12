import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { AdminProvider } from './contexts/AdminContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </LanguageProvider>
  </StrictMode>
);