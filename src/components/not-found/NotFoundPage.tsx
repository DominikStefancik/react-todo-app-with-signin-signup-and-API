import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_DASHBOARD_PATH } from '../../url';
import { GhostButton } from '../styled/Button';
import { Container } from '../styled/Container';
import { Panel } from '../styled/Panel';
import { Paragraph } from '../styled/Paragraph';
import { Title } from '../styled/Title';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container color="#ffffff" backgroundColor="#ff4b2b">
      <Panel>
        <Title>404 - The requested page doesn't exist</Title>
        <Paragraph>We're sorry, but the page you are trying to reach doesn't exist</Paragraph>
        <GhostButton
          onClick={() => {
            navigate(APP_DASHBOARD_PATH, { replace: true });
          }}
        >
          Go back to Dashboard
        </GhostButton>
      </Panel>
    </Container>
  );
};

export default NotFoundPage;
