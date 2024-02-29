import { useState } from 'react';
import { VStack, Input, Button, Checkbox, Flex, Spacer } from '@chakra-ui/react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleToggleComplete = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <VStack spacing={4} align="stretch">
      <Input
        placeholder="Add a new to do List"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <Button onClick={handleAddTodo}>Add Todo</Button>
      {todos.map(todo => (
        <Flex key={todo.id} align="center">
          <Checkbox
            isChecked={todo.completed}
            onChange={() => handleToggleComplete(todo.id)}
            colorScheme='green'
          >
            {todo.text}
          </Checkbox>
          <Spacer />
          <Button onClick={() => handleDeleteTodo(todo.id)} colorScheme="red" size="sm">
            Delete
          </Button>
        </Flex>
      ))}
    </VStack>
  );
};

export default TodoList;
