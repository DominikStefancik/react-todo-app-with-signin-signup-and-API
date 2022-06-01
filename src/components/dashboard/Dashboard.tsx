import React from 'react';
import { Container } from '../styled/Container';
import Header from './Header';
import Todo from './todo/Todo';

const Dashboard = () => {
  return (
    <Container color="#ffffff" backgroundColor="#ff4b2b" width="1600px" minHeight="850px">
      <Header />
      <Todo />
    </Container>
  );
};

export default Dashboard;
