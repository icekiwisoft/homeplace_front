import React from 'react'
import './App.scss'
import Home from './pages/Home.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
