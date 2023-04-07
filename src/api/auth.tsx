import { BASE_URL } from './const';

type AuthResult = 'success' | 'fail';

export interface AuthRequest {
  email: string;
  password: string;
}

export const singUp = async (args: AuthRequest): Promise<AuthResult> => {
  const SignUpRes = await fetch(`${BASE_URL}auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  return SignUpRes.ok ? 'success' : 'fail';
};

export const login: (args: AuthRequest) => Promise<AuthResult> = async (
  args
) => {
  const loginRes = await fetch(`${BASE_URL}auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  const loginData = await loginRes.json();
  if (loginRes.ok) {
    localStorage.setItem('token', loginData.access_token);
  }
  return loginRes.ok ? 'success' : 'fail';
};
