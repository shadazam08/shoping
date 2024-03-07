import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routers from './Page/Routes/Routers';
import { AuthProvider } from './context/AppContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Routers />
    </AuthProvider>
  </React.StrictMode>
);