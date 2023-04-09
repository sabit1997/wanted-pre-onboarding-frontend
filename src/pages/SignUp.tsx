export default function SignUp() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Sign Up</h1>
      </header>
      <main className="page-main">
        <form>
          <div className="input-wrap">
            <label htmlFor="email" className="input-title">
              e-mail
            </label>
            <input
              type="email"
              id="email"
              className="input-section"
              data-testid="email-input"
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="password" className="input-title">
              password
            </label>
            <input
              type="password"
              id="password"
              className="input-section"
              data-testid="password-input"
            />
          </div>
          <button
            type="submit"
            className="form-button"
            data-testid="signup-button"
          >
            회원가입
          </button>
        </form>
      </main>
    </div>
  );
}
