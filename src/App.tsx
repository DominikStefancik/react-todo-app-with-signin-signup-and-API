import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/home-page/HomePage';
import SignupSuccessPage from './components/signup-success/SignupSuccessPage';
import SignoutPage from './components/signout/SignoutPage';
import {
  APP_DASHBOARD_PATH,
  APP_HOME_PATH,
  APP_SIGNOUT_PATH,
  APP_SIGNUP_SUCCESS_PATH,
} from './url';
import RequiredAuth from './components/auth/RequiredAuth';
import NotFoundPage from './components/not-found/NotFoundPage';
import Dashboard from './components/dashboard/Dashboard';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path={APP_HOME_PATH} element={<HomePage />} />
        <Route path={APP_SIGNUP_SUCCESS_PATH} element={<SignupSuccessPage />} />
        <Route path={APP_SIGNOUT_PATH} element={<SignoutPage />} />

        {/* Private routes */}
        <Route element={<RequiredAuth />}>
          <Route path={APP_DASHBOARD_PATH} element={<Dashboard />} />
        </Route>

        {/* All other paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
