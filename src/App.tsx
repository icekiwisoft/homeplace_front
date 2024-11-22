import './stores/defineStore.ts';

import Error403 from '@pages/errors/403.tsx';
import Error404 from '@pages/errors/404.tsx';
import Error500 from '@pages/errors/500.tsx';
import Home from '@pages/Home/Home.tsx';
import Login from '@pages/Login/Login.tsx';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

import Ad from '@pages/Ad/Ad.tsx';
import Ads from '@pages/Ads/Ads.tsx';
import Signup from '@pages/Signup/Signup.tsx';

import Subscriptions from '@pages/Subscriptions/Subscriptions.tsx';
import Announcer from '@pages/Announcer/Announcer.tsx';
import Furnitures from '@pages/Furnitures/Furnitures.tsx';
import Favorite from '@pages/Favorites/Favorite.tsx';
import Validation from '@pages/Validation/Validation.tsx';
import Services from '@components/services/Services.tsx';
import Forgot from '@pages/Forgot/Forgot.tsx';
import SigninDialog from '@components/SigninDialog/SigninDialog.tsx';
import usePulsy from 'pulsy';
import { AuthData } from '@utils/types.ts';
import { authDataActions } from './stores/defineStore.ts';

function App(): React.ReactElement | null {
  const [signinModal] = usePulsy<boolean>('signinModal');
  const [authData] = usePulsy<AuthData>('authData');

  useEffect(() => {
    authDataActions.authenticate();
  }, []);

  if (authData.status == 'unknow') return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
        <Route path='/Forgot' Component={Forgot} />
        <Route path='houses' Component={Ads} />
        <Route path='houses/:id' Component={Ad} />
        <Route path='furnitures' Component={Furnitures} />
        <Route path='/Validation' Component={Validation} />
        <Route path='/favorite' Component={Favorite} />
        <Route path='services' Component={Services} />

        <Route path='subscriptions' Component={Subscriptions} />
        <Route path='announcers/:id' Component={Announcer} />

        <Route path='*' Component={Error404} />
        <Route path='/403' Component={Error403} />
        <Route path='/500' Component={Error500} />
        <Route path='/404' Component={Error403} />
      </Routes>

      {signinModal && <SigninDialog />}
    </BrowserRouter>
  );
}

export default App;
