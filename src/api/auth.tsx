import { BASE_URL } from './const';

type SignUpResult = 'success' | 'fail';

export interface AuthRequest {
  email: string;
  password: string;
}

export const singUp = async (args: AuthRequest): Promise<SignUpResult> => {
  const SignUpRes = await fetch(`${BASE_URL}auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  return SignUpRes.ok ? 'success' : 'fail';
};

export const login: (args: AuthRequest) => Promise<void> = async (args) => {
  const loginRes = await fetch(`${BASE_URL}auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  const loginData = await loginRes.json();
  localStorage.setItem('token', loginData.access_token);
};
