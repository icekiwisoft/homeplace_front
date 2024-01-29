import React from 'react'
import './App.scss'
import Home from './pages/Home.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Products from './pages/Products.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Announcer from './pages/Dashboard/Announcer/Announcer.tsx'
import Announcers from './pages/Dashboard/Announcers/Announcers.tsx'
import Fourniture from './components/Dashboardcontent/Fourniture.tsx'
import Login from './pages/Login.tsx'
import Logout from './pages/Logout.tsx'
import Signup from './pages/Signup.tsx'
import Error404 from './pages/errors/404.tsx'
import Error403 from './pages/errors/403.tsx'
import Error500 from './pages/errors/500.tsx'

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
        <Route path='/logout' Component={Logout} />
        <Route path='announces' Component={Products} />
        <Route path="/dashboard" Component={Dashboard}>
          <Route index element={<Navigate to="announcers" replace />} />
          <Route path="announcers" element={<Announcers />} />
          <Route path="furnitures" element={<Fourniture />} />
          <Route path="announcers/:id" element={<Announcer />} />
        </Route>

        <Route path="*" Component={Error404} />
        <Route path="/403" Component={Error403} />
        <Route path="/500" Component={Error500} />
        <Route path="/404" Component={Error403} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
