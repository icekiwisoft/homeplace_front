import React from 'react'
import './App.scss'
import Home from './pages/Home.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Products from './pages/Products.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Announcer from './pages/Dashboard/Announcer/Announcer.tsx'
import Announcers from './pages/Dashboard/Announcers/Announcers.tsx'
import Fourniture from './components/Dashboardcontent/Fourniture.tsx'

function App(): React.ReactElement {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' index Component={Home}/>
<Route  path='announces' Component={Products} />
          <Route path="/dashboard" Component={Dashboard}>
            <Route  index  element={<Navigate to="announcers" replace/>} />
            <Route path="announcers" element={<Announcers />} />
            <Route path="furnitures" element={<Fourniture />} />
            <Route path="announcers/:id" element={<Announcer/>}/>
          </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
