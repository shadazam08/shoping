import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
// import '@fortawesome/fontawesome-free/css/line-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routers from './Page/Routes/Routers';
import { AuthProvider } from './context/AppContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AuthProvider>
      <Routers />
    </AuthProvider>
  </StrictMode>
);