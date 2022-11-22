import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './routes/NotFound';
import App from './App';
import Home from './routes/Home';
import Cart from './routes/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorPage: <NotFound/>,
    children: [
      {
        path: '*',
        element: <NotFound/>,
      },
      {
        index: true,
        element: <Home/>,
      },
      {
        path: '/cart',
        element: <Cart/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

