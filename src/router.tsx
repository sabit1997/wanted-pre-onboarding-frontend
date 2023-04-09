import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import Todo from 'pages/Todo';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import GeneralLayout from 'layout/GeneralLayout';
import Home from 'pages/Home';

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
  withAuth?: boolean;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    label: 'Home',
    element: <Home />,
    withAuth: false,
  },
  {
    id: 1,
    path: '/todo',
    label: 'Todo',
    element: <Todo />,
    withAuth: true,
  },
  {
    id: 2,
    path: '/signin',
    label: 'SignIn',
    element: <SignIn />,
    withAuth: false,
  },
  {
    id: 3,
    path: '/signup',
    label: 'SignUp',
    element: <SignUp />,
    withAuth: false,
  },
];

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: <GeneralLayout>{router.element}</GeneralLayout>,
      };
    } else {
      return {
        path: router.path,
        element: router.element,
      };
    }
  })
);

export interface SidebarElement {
  id: number;
  label: string;
  path: string;
}

export const SidebarContent: SidebarElement[] = routerData.reduce(
  (prev, router) => {
    if (!router.withAuth) return prev;
    return [
      ...prev,
      {
        id: router.id,
        path: router.path,
        label: router.label,
      },
    ];
  },
  [] as SidebarElement[]
);
