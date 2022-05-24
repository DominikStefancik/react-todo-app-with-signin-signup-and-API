import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  // the Outlet component represent all the components nested in the Layout component
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default Layout;
