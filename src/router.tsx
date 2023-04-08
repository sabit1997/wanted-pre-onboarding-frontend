import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import Todo from 'pages/Todo';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import GeneralLayout from 'layout/GeneralLayout';

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
}

const routerData: RouterElement[] = [
  {
    id: 1,
    path: '/todo',
    label: 'Todo',
    element: <Todo />,
  },
  {
    id: 2,
    path: '/signin',
    label: 'SignIn',
    element: <SignIn />,
  },
  {
    id: 3,
    path: '/signup',
    label: 'SignUp',
    element: <SignUp />,
  },
];

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    return {
      path: router.path,
      element: <GeneralLayout>{router.element}</GeneralLayout>,
    };
  })
);

export interface SidebarElement {
  id: number;
  label: string;
  path: string;
}

export const SidebarContent: SidebarElement[] = routerData.reduce(
  (prev, router) => {
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
