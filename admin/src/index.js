import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Routers from './Page/Routes/Routers';
import { AuthProvider } from './context/AppContext';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AuthProvider>
      <Routers />
    </AuthProvider>
  </StrictMode>
);