import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_HOME_PATH } from '../../url';
import { GhostButton } from '../styled/Button';
import { Container } from '../styled/Container';
import { Panel } from '../styled/Panel';
import { Paragraph } from '../styled/Paragraph';
import { Title } from '../styled/Title';

const SignoutPage = () => {
  const navigate = useNavigate();

  return (
    <Container color="#ffffff" backgroundColor="#ff4b2b">
      <Panel>
        <Title>You have been signed out!</Title>
        <Paragraph>Do you want to sign in?</Paragraph>
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

export default SignoutPage;
