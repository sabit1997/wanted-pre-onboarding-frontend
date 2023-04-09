import { login } from 'api/auth';
import { useRouter } from 'hooks/useRouter';
import React, { useState } from 'react';

type VaildResult = 'pass' | 'fail' | '';

export default function SignIn() {
  const { routeTo } = useRouter();
  const [emailValid, setEmailVaild] = useState<VaildResult>('');
  const [passwordValid, setPasswordValid] = useState<VaildResult>('');

  const vaildateEmail = (email: string) => {
    const emailPattern = /@/;

    if (emailPattern.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const vaildatePassword = (password: string) => {
    if (password.length < 8) {
      return false;
    } else {
      return true;
    }
  };

  const loginSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (localStorage.getItem('token')) {
      routeTo('/');
      return;
    }

    const formData = new FormData(e.currentTarget);

    const loginResult = await login({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (loginResult === 'fail') {
      alert('로그인 실패');
      return;
    }
    routeTo('/todo');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const isValid = vaildateEmail(email);
    if (isValid) {
      setEmailVaild('pass');
    } else {
      setEmailVaild('fail');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const isValid = vaildatePassword(password);
    if (isValid) {
      setPasswordValid('pass');
    } else {
      setPasswordValid('fail');
    }
  };

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Sign In</h1>
      </header>
      <main className="page-main">
        <form onSubmit={loginSubmitHandler}>
          <div className="input-wrap">
            <label htmlFor="email" className="input-title">
              e-mail
            </label>
            <input
              type="email"
              id="email"
              className={
                emailValid === 'fail'
                  ? 'input-section input-error'
                  : emailValid === 'pass'
                  ? 'input-section input-pass'
                  : 'input-section'
              }
              data-testid="email-input"
              name="email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="password" className="input-title">
              password
            </label>
            <input
              type="password"
              id="password"
              className={
                passwordValid === 'fail'
                  ? 'input-section input-error'
                  : passwordValid === 'pass'
                  ? 'input-section input-pass'
                  : 'input-section'
              }
              data-testid="password-input"
              name="password"
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="button form-button"
            data-testid="signin-button"
            disabled={
              emailValid === 'fail' || passwordValid === 'fail' ? true : false
            }
          >
            로그인
          </button>
        </form>
        <button type="button" onClick={() => routeTo('/signup')}>
          회원가입
        </button>
      </main>
    </div>
  );
}
