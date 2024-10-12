import React from "react";
import Home from "@pages/Home/Home.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import  DashboardAnnouncer from "@pages/Dashboard/Announcer/Announcer.tsx";
import Announcers from "@pages/Dashboard/Announcers/Announcers.tsx";
import Login from "@pages/Login/Login.tsx";
import Logout from "@pages/Logout/Logout.tsx";
import "leaflet/dist/leaflet.css";
import Error404 from "@pages/errors/404.tsx";
import Error403 from "@pages/errors/403.tsx";
import Error500 from "@pages/errors/500.tsx";

import { AuthProvider } from "./context/AuthContext.tsx";
import Ad from "@pages/Ad/Ad.tsx";
import Ads from "@pages/Ads/Ads.tsx";
import AdsAdmin from "@pages/Dashboard/Ads/Ads.tsx";
import Signup from "@pages/Signup/Signup.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import Traffic from "@pages/Dashboard/Traffic/Traffic.tsx";
import Categories from "@pages/Dashboard/Categories/Categories.tsx";
import Download from "@pages/Download/Download.tsx";
import Subscriptions from "@pages/Subscriptions/Subscriptions.tsx";
import Announcer from "@pages/Announcer/Announcer.tsx";
import Furnitures from "@pages/Furnitures/Furnitures.tsx";
import Favorite from "@pages/Favorites/Favorite.tsx";
import Profile from "@pages/Dashboard/Profile/Profile.tsx";
import Settings from "@pages/Dashboard/Settings/Settings.tsx";
import Validation from "@pages/Validation/Validation.tsx";
import Services from "@components/services/Services.tsx";
import Forgot from "@pages/Forgot/Forgot.tsx";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" index Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/Forgot" Component={Forgot} />
          <Route path="houses" Component={Ads} />
          <Route path="houses/:id" Component={Ad} />
          <Route path="furnitures" Component={Furnitures} />
          <Route path="/Validation" Component={Validation} />
          <Route path="/favorite" Component={Favorite} />
          <Route path="Services" Component={Services} />

          <Route path="subscriptions" Component={Subscriptions} />
          <Route path="announcers/:id" Component={Announcer} />
          <Route path="/dashboard" Component={DashboardLayout}>
            <Route index element={<Navigate to="announcers" replace />} />
            <Route path="announcers" Component={Announcers} />
            <Route path="ads" Component={AdsAdmin} />
            <Route path="visualization/traffic" Component={Traffic} />
            <Route path="categories" Component={Categories} />
            <Route path="Settings" Component={Settings} />
            <Route path="Profile" Component={Profile} />
            <Route path="announcers/:id" Component={DashboardAnnouncer} />
          </Route>

          <Route path="/download" Component={Download} />
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
