import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './styles/reset.css';
import './styles/global.css';
import './styles/App.css';
import { routers } from 'router';
import { AuthProvider } from 'context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routers} />
    </AuthProvider>
  );
}

export default App;
