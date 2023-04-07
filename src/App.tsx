import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './styles/reset.css';
import './styles/global.css';
import './styles/App.css';
import { routers } from 'router';

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
