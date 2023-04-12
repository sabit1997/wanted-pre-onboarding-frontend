import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'hooks/useRouter';
import React from 'react';
import AuthForm from 'templates/AuthForm';

export default function SignIn() {
  const { login, token } = useContext(AuthContext);
  const { routeTo } = useRouter();

  const loginSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token !== null) {
      routeTo('/todo');
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

  return <AuthForm formSubmitHandler={loginSubmitHandler} />;
}
