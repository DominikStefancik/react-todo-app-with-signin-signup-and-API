import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { APP_HOME_PATH, APP_SIGNOUT_PATH } from '../../url';
import { GhostButton } from '../styled/Button';
import { Panel } from './styled/Panel';

const Header = () => {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const signout = () => {
    // before we navigate to the signout page, clear user's data
    authUser && setAuthUser!({ email: '', password: '', accessToken: '', refreshToken: '' });
    navigate(`${APP_HOME_PATH}${APP_SIGNOUT_PATH}`, { replace: true });
  };

  return (
    <Panel width="14%" height="7%" positionY="5%" positionX="-15%">
      <GhostButton onClick={() => signout()}>Sign Out</GhostButton>
    </Panel>
  );
};

export default Header;
