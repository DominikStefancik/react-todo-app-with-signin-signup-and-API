import React, { useRef } from 'react';
import { Button, Form, Input } from './styled/Form';

interface TodoFormProps {
  todoItem: string;
  setTodoItem: React.Dispatch<React.SetStateAction<string>>;
  addTodoItem: (event: React.FormEvent) => void;
}

const TodoForm = ({ todoItem, setTodoItem, addTodoItem }: TodoFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Form
      onSubmit={(event: React.FormEvent) => {
        addTodoItem(event);
        // following call is to ensure that the background gets back to light blue
        // after a user created a new todo item by pressing the Enter button
        inputRef.current?.blur();
      }}
    >
      <Input
        type="input"
        ref={inputRef}
        placeholder="Enter a new Todo item"
        value={todoItem}
        onChange={(event) => setTodoItem(event.target.value)}
      />
      <Button type="submit">Create Item</Button>
    </Form>
  );
};

export default TodoForm;
