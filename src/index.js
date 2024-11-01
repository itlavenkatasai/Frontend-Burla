import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Register from './components/Register';
import Login from './components/Login';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

const AppLayout = ()=>{
  return(
    <Outlet />
  )
}
const appRouter = createBrowserRouter([
  {
    path : '/',
    element : <AppLayout />,
    children:[
      {
        path : '/',
        element : <Login />
      },
      {
        path : '/login',
        element : <Login />
      },
      {
        path : 'register',
        element : <Register />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>
);


