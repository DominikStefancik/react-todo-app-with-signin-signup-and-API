import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GhostButton } from '../styled/Button';
import { Container } from '../styled/Container';
import { Panel } from '../styled/Panel';
import { Title } from '../styled/Title';
import { Paragraph } from '../home-page/styled/OverlayPanel';
import { APP_HOME_PATH } from '../../url';

const SignupSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container width="950px" color="#ffffff" backgroundColor="#ff4b2b">
      <Panel>
        <Title>Your new account has been sucessfully created!</Title>
        <Paragraph>Please go the startup page and sign in</Paragraph>
        <GhostButton
          onClick={() => {
            navigate(APP_HOME_PATH, { replace: true });
          }}
        >
          Sign In
        </GhostButton>
      </Panel>
    </Container>
  );
};

export default SignupSuccessPage;
