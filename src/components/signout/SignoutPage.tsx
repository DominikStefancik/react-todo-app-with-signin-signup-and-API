import React from 'react';
import { GhostButton } from '../styled/Button';
import { Container } from '../styled/Container';
import { Panel } from '../styled/Panel';
import { Paragraph } from '../styled/Paragraph';
import { Title } from '../styled/Title';

const SignoutPage = () => {
  return (
    <Container color="#ffffff" backgroundColor="#ff4b2b">
      <Panel>
        <Title>You have been signed out!</Title>
        <Paragraph>Do you want to sign in?</Paragraph>
        <GhostButton onClick={() => {}}>Sign In</GhostButton>
      </Panel>
    </Container>
  );
};

export default SignoutPage;
