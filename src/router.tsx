import { createBrowserRouter, Navigate } from 'react-router-dom';
import Todo from 'pages/Todo';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import GeneralLayout from 'layout/GeneralLayout';
import Home from 'pages/Home';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
  withAuth?: boolean;
}

const useHasToken = () => {
  const { token } = useContext(AuthContext);
  if (token !== null) {
    return true;
  } else {
    return false;
  }
};

interface TodoRouteProps {
  path: string;
}

const RedirectRoute = ({ path }: TodoRouteProps) => {
  const hasToken = useHasToken();
  switch (path) {
    case '/todo':
      return hasToken ? <Todo /> : <Navigate to="/signin" />;
    case '/signin':
      return hasToken ? <Navigate to="/todo" /> : <SignIn />;
    case '/signup':
      return hasToken ? <Navigate to="/todo" /> : <SignUp />;
    default:
      return null;
  }
};

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
    element: <RedirectRoute path="/todo" />,
    withAuth: true,
  },
  {
    id: 2,
    path: '/signin',
    label: 'SignIn',
    element: <RedirectRoute path="/signin" />,
    withAuth: false,
  },
  {
    id: 3,
    path: '/signup',
    label: 'SignUp',
    element: <RedirectRoute path="/signup" />,
    withAuth: false,
  },
];

export const routers = createBrowserRouter(
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
