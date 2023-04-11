import { singUp } from 'api/auth';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'hooks/useRouter';
import React, { useContext, useState } from 'react';
import { vaildateEmail, vaildatePassword } from 'utils/validations';

type VaildResult = 'pass' | 'fail' | '';

export default function SignUp() {
  const { token } = useContext(AuthContext);
  const { routeTo } = useRouter();
  const [emailValid, setEmailVaild] = useState<VaildResult>('');
  const [passwordValid, setPasswordValid] = useState<VaildResult>('');

  const signUpSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token !== null) {
      routeTo('/todo');
      return;
    }

    const formData = new FormData(e.currentTarget);

    const signUpResult = await singUp({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (signUpResult === 'fail') {
      alert('회원가입 실패');
      return;
    }
    routeTo('/signin');
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
        <h1 className="page-title">Sign Up</h1>
      </header>
      <main className="page-main">
        <form onSubmit={signUpSubmitHandler}>
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
            data-testid="signup-button"
            disabled={
              emailValid === 'fail' || passwordValid === 'fail' ? true : false
            }
          >
            회원가입
          </button>
        </form>
      </main>
    </div>
  );
}
