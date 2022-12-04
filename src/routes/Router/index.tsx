import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Index from '../Index';
import Home from '../Home';
import NotFound from '../NotFound';
import Cart from '../Cart';
import PizzaPage from '../PizzaPage';


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Index/>} errorElement={<NotFound/>}>
          {/*<Route path='*' element={<NotFound/>}/>*/}
          <Route index={true} element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/pizza/:id' element={<PizzaPage/>}/>
        </Route>
    )
);

