import React, { useEffect } from 'react';
import { GhostButton } from '../styled/Button';
import { Container } from '../styled/Container';
import { Title } from '../styled/Title';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { Overlay, OverlayContainer } from './styled/OverlayContainer';
import { LeftOverlayPanel, Paragraph, RightOverlayPanel } from './styled/OverlayPanel';
import { SignInContainer } from './styled/SignInContainer';
import { SignUpContainer } from './styled/SignUpContainer';
import './styles.css';

const HomePage = () => {
  const [isSignInForm, setSignInForm] = React.useState(true);

  useEffect(() => {
    setSignInForm(true);
  }, []);

  return (
    <Container>
      <SignUpContainer isSignInForm={isSignInForm}>
        <SignupForm isSignInForm={isSignInForm} />
      </SignUpContainer>
      <SignInContainer isSignInForm={isSignInForm}>
        <SigninForm isSignInForm={isSignInForm} />
      </SignInContainer>
      <OverlayContainer isSignInForm={isSignInForm}>
        <Overlay isSignInForm={isSignInForm}>
          <LeftOverlayPanel isSignInForm={isSignInForm}>
            <Title>Welcome Back!</Title>
            <Paragraph>To keep connected with us please login with your personal info</Paragraph>
            <GhostButton onClick={() => setSignInForm(true)}>Sign In</GhostButton>
          </LeftOverlayPanel>
          <RightOverlayPanel isSignInForm={isSignInForm}>
            <Title>Hello, Friend!</Title>
            <Paragraph>Enter your personal details and start journey with us</Paragraph>
            <GhostButton onClick={() => setSignInForm(false)}>Sign Up</GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default HomePage;
