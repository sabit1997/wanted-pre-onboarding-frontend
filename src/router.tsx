import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import Home from 'pages/Home';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    label: 'Home',
    element: <Home />,
  },
  {
    id: 1,
    path: '/signin',
    label: 'SignIn',
    element: <SignIn />,
  },
  {
    id: 2,
    path: '/signup',
    label: 'SignUp',
    element: <SignUp />,
  },
];
