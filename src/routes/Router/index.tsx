import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { Root, Home} from '../index';
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'../Cart'));
const PizzaPage = React.lazy(() => import(/* webpackChunkName: "PizzaPage" */'../PizzaPage'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'../NotFound'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Root/>}
      errorElement={
        <React.Suspense fallback={<div>Loading...</div>}>
          <NotFound/>
        </React.Suspense>}
    >
      <Route
        index={true}
        element={<Home/>}
      />
      <Route
        path='/cart'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Cart/>
          </React.Suspense>}
      />
      <Route
        path='/pizza/:id'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <PizzaPage/>
          </React.Suspense>}
      />
    </Route>
  )
);
export default router;

