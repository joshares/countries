import React from 'react';
import './App.css';
import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SinglePage } from './pages/SinglePage';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='country/:id' element={<SinglePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
