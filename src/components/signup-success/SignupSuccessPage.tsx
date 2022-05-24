import React from 'react';
import { GhostButton } from '../styled/Button';
import { Container } from '../styled/Container';
import { Panel } from '../styled/Panel';
import { Title } from '../styled/Title';
import { Paragraph } from '../home-page/styled/OverlayPanel';

const SignupSuccessPage = () => {
  return (
    <Container width="950px" color="#ffffff" backgroundColor="#ff4b2b">
      <Panel>
        <Title>Your new account has been sucessfully created!</Title>
        <Paragraph>Please go the startup page and sing in</Paragraph>
        <GhostButton onClick={() => {}}>Sign In</GhostButton>
      </Panel>
    </Container>
  );
};

export default SignupSuccessPage;
