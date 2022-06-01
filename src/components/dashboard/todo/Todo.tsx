import React, { useState } from 'react';
import { axiosPrivate, getRequestConfig } from '../../../api/axios';
import { API_TODOS_PATH } from '../../../api/url';
import useAuth from '../../../hooks/useAuth';
import { Title } from '../../styled/Title';
import { Panel } from '../styled/Panel';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Item } from './types';

const Todo = () => {
  const [todoItem, setTodoItem] = useState<string>('');
  const [todoList, setTodoList] = useState<Item[]>([]);
  const { authUser } = useAuth();

  const controller = new AbortController();

  const addItemHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (todoItem) {
      try {
        const response = await axiosPrivate.post(
          API_TODOS_PATH,
          JSON.stringify({ description: todoItem }),
          getRequestConfig(controller, authUser?.accessToken)
        );

        const { id, description, done } = response.data;

        setTodoList([...todoList, { id, description, done }]);
        setTodoItem('');
      } catch (error) {}
    }
  };

  return (
    <div>
      <Panel width="90%" height="20%" positionY="30%">
        <Title>ToDo List</Title>
        <TodoForm todoItem={todoItem} setTodoItem={setTodoItem} addTodoItem={addItemHandler} />
      </Panel>
      <Panel width="90%" height="70%" positionY="30%">
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </Panel>
    </div>
  );
};

export default Todo;
