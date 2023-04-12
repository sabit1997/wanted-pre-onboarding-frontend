import { singUp } from 'api/auth';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'hooks/useRouter';
import React, { useContext } from 'react';
import AuthForm from 'templates/AuthForm';

export default function SignUp() {
  const { token } = useContext(AuthContext);
  const { routeTo } = useRouter();

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

  return <AuthForm formSubmitHandler={signUpSubmitHandler} />;
}
