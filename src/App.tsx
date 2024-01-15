import React from 'react'
import './App.scss'
import Home from './pages/Home.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './pages/Products.tsx'

function App(): React.ReactElement {

  return (
    <BrowserRouter>
    
    <Routes>
      <Route path='/' index Component={Home}/>
<Route  path='announces' Component={Products} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
