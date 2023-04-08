import { BASE_URL } from './const';

interface TodoRequest {
  todo: string;
}
const access_token = localStorage.getItem('token');

export const createTodo = async (args: TodoRequest) => {
  const createTodoRes = await fetch(`${BASE_URL}todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(args),
  });
  const createTodoData = await createTodoRes.json();
  console.log(createTodoData);
};

export const getTodos = async () => {
  const getTodosRes = await fetch(`${BASE_URL}todos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  const TodosData = await getTodosRes.json();
  return TodosData;
};

interface UpdateRequest {
  todo: string;
  isCompleted: boolean;
}

export const updateTodo = async (id: number, args: UpdateRequest) => {
  const updateTodoRes = await fetch(`${BASE_URL}todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(args),
  });
};

export const deleteTodo = async (id: number) => {
  const deleteTodoRes = await fetch(`${BASE_URL}todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
};
