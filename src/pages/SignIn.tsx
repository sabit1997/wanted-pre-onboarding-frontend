export default function SignIn() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-Title">Sign In</h1>
      </header>
      <main className="page-main">
        <form>
          <div className="input-wrap">
            <label htmlFor="email" className="input-title">
              e-mail
            </label>
            <input type="email" id="email" className="input-section" />
          </div>
          <div className="input-wrap">
            <label htmlFor="password" className="input-title">
              password
            </label>
            <input type="password" id="password" className="input-section" />
          </div>
          <button type="submit" className="form-button">
            로그인
          </button>
        </form>
      </main>
    </div>
  );
}
