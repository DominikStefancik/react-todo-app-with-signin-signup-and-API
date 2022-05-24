import React from 'react';
import './App.css';
import HomePage from './components/home-page/HomePage';
import SignupSuccessPage from './components/signup-success/SignupSuccessPage';
import SignoutPage from './components/signout/SignoutPage';

function App() {
  return (
    <div className="App">
      <HomePage />
      {/* <SignoutPage /> */}
      {/* <SignupSuccessPage /> */}
    </div>
  );
}

export default App;
