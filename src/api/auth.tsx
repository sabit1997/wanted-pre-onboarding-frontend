import { BASE_URL } from './const';

export type AuthResult = 'success' | 'fail';

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
