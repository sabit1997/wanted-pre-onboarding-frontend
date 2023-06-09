import { BASE_URL } from './const';

type TodoRequest = string;

type Token = string | null;

interface CreateTodoRequest {
  todo: TodoRequest;
  token: Token;
}

export const createTodo = async (args: CreateTodoRequest) => {
  const createTodoRes = await fetch(`${BASE_URL}todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${args.token}`,
    },
    body: JSON.stringify(args),
  });
  const createTodoData = await createTodoRes.json();
  console.log(createTodoData);
};

export const getTodos = async (token: Token) => {
  const getTodosRes = await fetch(`${BASE_URL}todos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const TodosData = await getTodosRes.json();
  return TodosData;
};

export interface UpdateRequest {
  id: number;
  todo: string;
  isCompleted: boolean;
  token: Token;
}

export const updateTodo = async (args: UpdateRequest) => {
  await fetch(`${BASE_URL}todos/${args.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${args.token}`,
    },
    body: JSON.stringify(args),
  });
};

export const deleteTodo = async (id: number, token: Token) => {
  await fetch(`${BASE_URL}todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
