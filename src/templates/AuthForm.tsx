import { useState } from 'react';
import { useRouter } from 'hooks/useRouter';
import { vaildateEmail, vaildatePassword } from 'utils/validations';

interface AuthFormProps {
  formSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}

type VaildResult = 'pass' | 'fail' | '';

export default function AuthForm({ formSubmitHandler }: AuthFormProps) {
  const { routeTo, currentPath } = useRouter();
  const [emailValid, setEmailVaild] = useState<VaildResult>('');
  const [passwordValid, setPasswordValid] = useState<VaildResult>('');

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
        <h1 className="page-title">
          {currentPath === '/signin' ? 'Sign In' : 'Sign Up'}
        </h1>
      </header>
      <main className="page-main">
        <form onSubmit={formSubmitHandler}>
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
            data-testid={
              currentPath === '/signin' ? 'signin-button' : 'signup-button'
            }
            disabled={
              emailValid === 'fail' || passwordValid === 'fail' ? true : false
            }
          >
            {currentPath === '/signin' ? '로그인' : '회원가입'}
          </button>
        </form>
        {currentPath === '/signin' ? (
          <button type="button" onClick={() => routeTo('/signup')}>
            회원가입
          </button>
        ) : null}
      </main>
    </div>
  );
}
