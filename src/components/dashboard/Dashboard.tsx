import React from 'react';
import { Container } from '../styled/Container';
import { Panel } from './todo/styled/Panel';
import Todo from './todo/Todo';

const Dashboard = () => {
  return (
    <Container color="#ffffff" backgroundColor="#ff4b2b" width="1600px" minHeight="850px">
      <Panel width="90%" height="5%" positionY="5%">
        Here comes header
      </Panel>
      <Todo />
    </Container>
  );
};

export default Dashboard;
