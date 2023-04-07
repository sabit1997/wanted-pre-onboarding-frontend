import { createTodo } from 'api/todo';

export default function Home() {
  const todoSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const todoResult = await createTodo({
      todo: formData.get('task') as string,
    });
  };
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">To Do</h1>
      </header>
      {localStorage.getItem('token') !== null ? (
        <main className="page-main">
          <form className="todo-form" onSubmit={todoSubmitHandler}>
            <input type="text" className="todo-input" name="task" />
            <button type="submit" className="todo-submit-button">
              작성
            </button>
          </form>
          <ul>
            <li>💖 해낸 일</li>
            <li>🖤 못한 일</li>
          </ul>
        </main>
      ) : (
        <p> 로그인을 해주세요.</p>
      )}
    </div>
  );
}
