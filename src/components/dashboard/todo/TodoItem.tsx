import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { axiosPrivate, getRequestConfig } from '../../../api/axios';
import { API_TODOS_PATH } from '../../../api/url';
import useAbortController from '../../../hooks/useAbortController';
import useAuth from '../../../hooks/useAuth';
import { Item } from './types';
import { EditableText, Form, Input, NonEditableText } from './styled/ItemForm';
import { Icon } from '../../styled/Icon';

interface TodoItemProps {
  todoItem: Item;
  todoList: Item[];
  setTodoList: React.Dispatch<React.SetStateAction<Item[]>>;
}

const TodoItem = ({ todoItem, todoList, setTodoList }: TodoItemProps) => {
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);

  // this hook represents an edit mode of a todo item
  // the default value will be the current description of the item
  const [editTodoDescription, setEditTodoDescription] = useState<string>(todoItem.description);

  const { authUser } = useAuth();
  const controller = useAbortController();

  const flagItemDone = async (itemId: string) => {
    try {
      await axiosPrivate.put(
        `${API_TODOS_PATH}${itemId}`,
        JSON.stringify({ description: todoItem.description, done: !todoItem.done }),
        getRequestConfig(controller, authUser?.accessToken)
      );

      setTodoList(
        todoList.map((item) => (item.id === itemId ? { ...item, done: !todoItem.done } : item))
      );
    } catch (error) {}
  };

  const deleteItem = async (itemId: string) => {
    try {
      await axiosPrivate.delete(
        `${API_TODOS_PATH}${itemId}`,
        getRequestConfig(controller, authUser?.accessToken)
      );

      setTodoList(todoList.filter((item) => item.id !== itemId));
    } catch (error) {}
  };
  const setEditMode = () => {
    // enter editing mode only when it is currently off and the item itself is not yet finished
    if (!isBeingEdited && !todoItem.done) {
      setIsBeingEdited(true);
    }
  };
  const editItem = async (event: React.FormEvent, itemId: string) => {
    event.preventDefault();

    try {
      await axiosPrivate.put(
        `${API_TODOS_PATH}${itemId}`,
        JSON.stringify({ description: editTodoDescription, done: todoItem.done }),
        getRequestConfig(controller, authUser?.accessToken)
      );

      setTodoList(
        todoList.map((item) =>
          item.id === itemId ? { ...item, description: editTodoDescription } : item
        )
      );
      // after a user confirms the description change, leave the editing mode
      setIsBeingEdited(false);
    } catch (error) {}
  };

  // this hook is used to reference the input for the autofocus when entering the editing mode (see below)
  const inputRef = useRef<HTMLInputElement>(null);

  // this hook is used when a user enters the editing mode and we want the focus to be automatically
  // in the input field (so the user doesn't have to manually click it)
  useEffect(() => {
    inputRef.current?.focus();
  }, [isBeingEdited]);

  return (
    <Form className="todoItem" onSubmit={(event) => editItem(event, todoItem.id)}>
      {isBeingEdited ? (
        <Input
          ref={inputRef}
          value={editTodoDescription}
          onChange={(event) => setEditTodoDescription(event.target.value)}
          className="todoItemText"
        />
      ) : todoItem.done ? (
        <NonEditableText className="todoItemText">{todoItem.description}</NonEditableText>
      ) : (
        <EditableText>{todoItem.description}</EditableText>
      )}

      <div>
        <Icon onClick={() => setEditMode()}>
          <FontAwesomeIcon icon={faPen} />
        </Icon>
        <Icon onClick={() => deleteItem(todoItem.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Icon>
        <Icon onClick={() => flagItemDone(todoItem.id)}>
          <FontAwesomeIcon icon={faCheck} />
        </Icon>
      </div>
    </Form>
  );
};

export default TodoItem;
