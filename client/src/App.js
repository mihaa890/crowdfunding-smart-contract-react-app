import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Campaign from './components/Campaign';
import { Fragment } from 'react';
import NotFound from './views/NotFound';
import React from 'react';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<Home />} />
          <Route path='/campaigns/:address' exact={true} element={<Campaign />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
