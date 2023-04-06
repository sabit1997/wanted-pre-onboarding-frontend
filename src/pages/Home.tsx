export default function Home() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">To Do</h1>
      </header>
      <main className="page-main">
        {/* LOGIN 상태면 TODO 작성 및 로드 , 비LOGIN 상태면 로그인 해달라는 문구 */}
        {/* <p>로그인을 해주세요.</p> */}
        <form className="todo-form">
          <input type="text" className="todo-input" />
          <button type="submit" className="todo-submit-button">
            작성
          </button>
        </form>
        <ul>
          <li>💖 해낸 일</li>
          <li>🖤 못한 일</li>
        </ul>
      </main>
    </div>
  );
}
