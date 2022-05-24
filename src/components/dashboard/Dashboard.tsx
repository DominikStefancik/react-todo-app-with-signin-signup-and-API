import React from 'react';
import { Container } from '../styled/Container';
import { Panel } from '../styled/Panel';
import { Title } from '../styled/Title';

const Dashboard = () => {
  return (
    <Container color="#ffffff" backgroundColor="#ff4b2b">
      <Panel>
        <Title>ToDo List</Title>
      </Panel>
    </Container>
  );
};

export default Dashboard;
