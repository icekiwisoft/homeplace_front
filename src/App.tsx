import { authDataActions } from './stores/defineStore.ts';

import Error403 from '@pages/errors/403.tsx';
import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

import Services from '@components/services/Services.tsx';
import SigninDialog from '@components/SigninDialog/SigninDialog.tsx';
import Ad from '@pages/Ad/Ad.tsx';
import Ads from '@pages/Ads/Ads.tsx';
import Announcer from '@pages/Announcer/Announcer.tsx';
import Error404 from '@pages/errors/404.tsx';
import Error500 from '@pages/errors/500.tsx';
import Favorite from '@pages/Favorites/Favorite.tsx';
import Forgot from '@pages/Forgot/Forgot.tsx';
import Furnitures from '@pages/Furnitures/Furnitures.tsx';
import Home from '@pages/Home/Home.tsx';
import Login from '@pages/Login/Login.tsx';
import Subscriptions from '@pages/Subscriptions/Subscriptions.tsx';
import Validation from '@pages/Validation/Validation.tsx';
import { AuthData } from '@utils/types.ts';
import usePulsy from 'pulsy';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from '@pages/Contact/Contact';

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
        <Route path='/contact' Component={Contact} />
      </Routes>

      {signinModal && <SigninDialog />}
    </BrowserRouter>
  );
}

export default App;
