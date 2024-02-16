
import React from 'react'
import './App.scss'
import Home from './pages/Home/Home.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Announcer from './pages/Dashboard/Announcer/Announcer.tsx'
import Announcers from './pages/Dashboard/Announcers/Announcers.tsx'
import Login from './pages/Login/Login.tsx'
import Logout from './pages/Logout/Logout.tsx'
import Error404 from './pages/errors/404.tsx'
import Error403 from './pages/errors/403.tsx'
import Error500 from './pages/errors/500.tsx'

import { AuthProvider } from './context/AuthContext.tsx'
import Ad from './pages/Ad/Ad.tsx'
import Ads  from './pages/Ads/Ads.tsx'
import AdsAdmin from './pages/Dashboard/Ads/Ads.tsx'
import Signup from './pages/Signup/Signup.tsx'
import DashboardLayout from './layouts/DashboardLayout.tsx'
import Traffic from './pages/Dashboard/Traffic/Traffic.tsx'
import Categories from './pages/Dashboard/Categories/Categories.tsx'

function App(): React.ReactElement {
  return (

    
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' index Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
        <Route path='/logout' Component={Logout} />
        <Route path='announces' Component={Ads} />
        <Route path='announces/:id' Component={Ad} />
        <Route path="/dashboard" Component={DashboardLayout}>
        
          <Route index element={<Navigate to="announcers" replace />} />
          <Route path="announcers" element={<Announcers />} />
          <Route path="ads" element={<AdsAdmin />} />
          <Route path="visualization/traffic" Component={Traffic} />
          <Route path="categories" Component={Categories} />

          <Route path="announcers/:id" element={<Announcer />} />
        </Route>

        <Route path="*" Component={Error404} />
        <Route path="/403" Component={Error403} />
        <Route path="/500" Component={Error500} />
        <Route path="/404" Component={Error403} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
