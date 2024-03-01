import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rought from './rought/Rought';

import './App.scss'
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Rought />
      </BrowserRouter>

    </>

  );
}

export default App;
