// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConstituentForm from './components/ConstituentForm';
import DuplicateChecker from './components/DuplicateChecker';
import CsvGenerator from './components/CsvGenerator';
import Home from './components/Home';
import './App.css'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/add" exact element={<ConstituentForm/>} />
        <Route path="/check_duplicates" exact element={<DuplicateChecker/>} />
        <Route path="/export" exact element={<CsvGenerator/>} />
      </Routes>
    </Router>
  );
};

export default App;