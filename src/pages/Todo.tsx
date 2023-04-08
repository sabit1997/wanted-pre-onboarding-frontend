import { createTodo, getTodos, UpdateRequest, updateTodo } from 'api/todo';
import { useEffect, useState, useRef } from 'react';

interface Todos {
  id: number;
  isCompleted: boolean;
  todo: string;
  userId: number;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const todoInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const getTodoData = async () => {
      const getTodosResult = await getTodos();
      setTodos(getTodosResult);
    };
    getTodoData();
  }, [todoSubmitHandler]);

  return (
    <div className="page-wrapper">
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
                  <button type="button" className="todo-submit-button">
                    수정
                  </button>
                  <button type="button" className="todo-submit-button">
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
