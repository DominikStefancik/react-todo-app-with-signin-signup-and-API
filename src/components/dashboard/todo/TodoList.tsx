import React, { useEffect } from 'react';
import { axiosPrivate, getRequestConfig } from '../../../api/axios';
import { API_TODOS_PATH } from '../../../api/url';
import useAbortController from '../../../hooks/useAbortController';
import useAuth from '../../../hooks/useAuth';
import { TodoListPanel } from '../styled/Panel';
import TodoItem from './TodoItem';
import { Item } from './types';

interface TodoListProps {
  todoList: Item[];
  setTodoList: React.Dispatch<React.SetStateAction<Item[]>>;
}

const TodoList = ({ todoList, setTodoList }: TodoListProps) => {
  const { authUser } = useAuth();
  const controller = useAbortController();

  useEffect(() => {
    let isMounted = true;

    const getTodos = async () => {
      try {
        const response = await axiosPrivate.get(
          API_TODOS_PATH,
          getRequestConfig(controller, authUser?.accessToken)
        );

        isMounted && setTodoList(response.data);
      } catch (error) {}
    };

    getTodos();

    // this function will be called after the component is unmounted and serves as a cleanup function
    return () => {
      isMounted = false;

      // cancel any pending request when the component unmounts
      // controller.abort();
    };
  }, []); // effect will be called when the component is mounted

  return (
    <TodoListPanel>
      {todoList &&
        todoList.map((item) => (
          <TodoItem key={item.id} todoItem={item} todoList={todoList} setTodoList={setTodoList} />
        ))}
    </TodoListPanel>
  );
};

export default TodoList;
