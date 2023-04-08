import {
  createTodo,
  getTodos,
  UpdateRequest,
  updateTodo,
  deleteTodo,
} from 'api/todo';
import Modal from 'components/Modal';
import { useEffect, useState, useRef } from 'react';

export interface Todos {
  id: number;
  isCompleted: boolean;
  todo: string;
  userId: number;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const todoInputRef = useRef<HTMLInputElement>(null);
  const [editTodo, setEditTodo] = useState<Todos>({
    id: 0,
    isCompleted: false,
    todo: '',
    userId: 0,
  });
  const [editModal, setEditModal] = useState(false);

  const todoSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const todoResult = await createTodo({
      todo: formData.get('task') as string,
    });

    if (todoInputRef.current) {
      todoInputRef.current.value = '';
    }
  };

  const completeButtonHandler = async (id: number, args: UpdateRequest) => {
    const completeResult = await updateTodo(id, args);
  };

  const deleteTodoButtonHandler = async (id: number) => {
    const deleteTodoResult = await deleteTodo(id);
  };

  const updateTodoButtonHandler = (todoValue: Todos) => {
    setEditTodo(todoValue);
    setEditModal(true);
  };

  useEffect(() => {
    const getTodoData = async () => {
      const getTodosResult = await getTodos();
      setTodos(getTodosResult);
    };
    getTodoData();
  }, [todoSubmitHandler]);

  return (
    <div className="page-wrapper">
      {editModal && (
        <Modal
          editTodo={editTodo}
          setEditModal={setEditModal}
          setEditTodo={setEditTodo}
        />
      )}
      <header className="page-header">
        <h1 className="page-title">To Do</h1>
      </header>
      {localStorage.getItem('token') !== null ? (
        <main className="page-main">
          <form className="todo-form" onSubmit={todoSubmitHandler}>
            <input
              type="text"
              className="todo-input"
              name="task"
              ref={todoInputRef}
            />
            <button type="submit" className="todo-submit-button">
              작성
            </button>
          </form>
          <ul>
            {todos.map((element) => {
              return (
                <li key={element.id}>
                  <button
                    onClick={() =>
                      completeButtonHandler(element.id, {
                        todo: element.todo,
                        isCompleted: !element.isCompleted,
                      })
                    }
                  >
                    {element.isCompleted ? '💖' : '🖤'}
                  </button>
                  {element.todo}
                  <button
                    type="button"
                    className="todo-submit-button"
                    onClick={() => {
                      updateTodoButtonHandler(element);
                    }}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    className="todo-submit-button"
                    onClick={() => {
                      deleteTodoButtonHandler(element.id);
                    }}
                  >
                    삭제
                  </button>
                </li>
              );
            })}
          </ul>
        </main>
      ) : (
        <p> 로그인을 해주세요.</p>
      )}
    </div>
  );
}
