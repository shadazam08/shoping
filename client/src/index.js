import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AppContext';
import Rought from './Routes/Rought';
import './App.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AuthProvider>
      <Rought />
    </AuthProvider>
  </StrictMode>
);