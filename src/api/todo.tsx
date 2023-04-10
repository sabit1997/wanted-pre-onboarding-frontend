import { BASE_URL } from './const';

interface TodoRequest {
  todo: string;
}

export const createTodo = async (args: TodoRequest, token: string | null) => {
  const createTodoRes = await fetch(`${BASE_URL}todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(args),
  });
  const createTodoData = await createTodoRes.json();
  console.log(createTodoData);
};

export const getTodos = async (token: string | null) => {
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
  todo: string;
  isCompleted: boolean;
}

export const updateTodo = async (
  id: number,
  args: UpdateRequest,
  token: string | null
) => {
  const updateTodoRes = await fetch(`${BASE_URL}todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(args),
  });
};

export const deleteTodo = async (id: number, token: string | null) => {
  const deleteTodoRes = await fetch(`${BASE_URL}todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
