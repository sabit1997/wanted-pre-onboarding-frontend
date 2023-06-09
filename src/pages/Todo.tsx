import { createTodo, getTodos, updateTodo, deleteTodo } from 'api/todo';
import { AuthContext } from 'context/AuthContext';
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react';

export interface Todos {
  id: number;
  isCompleted: boolean;
  todo: string;
  userId: number;
  isEdit?: boolean;
}

export default function Todo() {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState<Todos[]>([]);
  const todoInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await createTodo({
      todo: formData.get('task') as string,
      token: token,
    });

    if (todoInputRef.current) {
      todoInputRef.current.value = '';
    }
    getTodoDataUpdate();
  };

  interface CompleteButtonRequest {
    id: number;
    todo: string;
    isCompleted: boolean;
  }

  const completeButtonHandler = async (args: CompleteButtonRequest) => {
    await updateTodo({
      id: args.id,
      todo: args.todo,
      isCompleted: args.isCompleted,
      token: token,
    });
    const updateResult = todos.map((element) =>
      element.id === args.id
        ? { ...element, isCompleted: args.isCompleted }
        : element
    );
    setTodos(updateResult);
  };

  const deleteTodoButtonHandler = async (id: number) => {
    await deleteTodo(id, token);
    getTodoDataUpdate();
  };

  const updateTodoButtonHandler = (specificIndex: number) => {
    const updateTodo = todos.map((item, index) =>
      index === specificIndex ? { ...item, isEdit: true } : item
    );
    setTodos(updateTodo);
  };

  const cancelUpdateButtonHandler = (specificIndex: number) => {
    const updateTodo = todos.map((item, index) =>
      index === specificIndex && item.isEdit ? { ...item, isEdit: false } : item
    );
    setTodos(updateTodo);
  };

  const updateTodoSubmitButtonHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number,
    isCompleted: boolean,
    index: number
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateTodo({
      id,
      todo: formData.get('update-todo-input') as string,
      isCompleted: isCompleted,
      token,
    });
    cancelUpdateButtonHandler(index);
    getTodoDataUpdate();
  };

  const getTodoDataUpdate = useCallback(async () => {
    const getTodosResult = await getTodos(token);
    setTodos(getTodosResult);
  }, [setTodos, todos]);

  // 처음에 todo data 렌더링 해오기
  useEffect(() => {
    const getTodoData = async () => {
      const getTodosResult = await getTodos(token);
      setTodos(getTodosResult);
    };
    if (token !== null && todos.length === 0) {
      getTodoData();
      console.log('나 실행!');
    }
  }, [token]);
  console.log(todos);

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">To Do</h1>
      </header>
      {token !== null ? (
        <main className="page-main">
          <form className="todo-form" onSubmit={todoSubmitHandler}>
            <input
              type="text"
              className="todo-input"
              name="task"
              ref={todoInputRef}
              data-testid="new-todo-input"
            />
            <button
              type="submit"
              className="todo-submit-button"
              data-testid="new-todo-add-button"
            >
              추가
            </button>
          </form>
          <ul>
            {todos &&
              todos.map((element, index) => {
                return (
                  <li
                    key={element.id}
                    className={element.isEdit ? 'edit-mode-list' : ''}
                  >
                    <label>
                      <label htmlFor="todo-check">
                        {element.isCompleted ? '💖' : '🖤'}
                      </label>
                      <input
                        type="checkbox"
                        id="todo-check"
                        className="ir"
                        onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                          completeButtonHandler({
                            id: element.id,
                            todo: element.todo,
                            isCompleted: e.currentTarget.checked,
                          })
                        }
                      />
                      {element.isEdit ? null : <span>{element.todo}</span>}
                    </label>
                    {element.isEdit ? (
                      <form
                        onSubmit={(e) => {
                          updateTodoSubmitButtonHandler(
                            e,
                            element.id,
                            element.isCompleted,
                            index
                          );
                        }}
                      >
                        <input
                          type="text"
                          defaultValue={element.todo}
                          name="update-todo-input"
                          data-testid="modify-input"
                        />
                        <button
                          type="submit"
                          className="todo-submit-button"
                          data-testid="submit-button"
                        >
                          제출
                        </button>
                        <button
                          type="button"
                          className="todo-submit-button"
                          data-testid="cancel-button"
                          onClick={() => {
                            cancelUpdateButtonHandler(index);
                          }}
                        >
                          취소
                        </button>
                      </form>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="todo-submit-button"
                          data-testid="modify-button"
                          onClick={() => {
                            updateTodoButtonHandler(index);
                          }}
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          className="todo-submit-button"
                          data-testid="delete-button"
                          onClick={() => {
                            deleteTodoButtonHandler(element.id);
                          }}
                        >
                          삭제
                        </button>
                      </>
                    )}
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
