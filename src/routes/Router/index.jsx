import { useRoutes } from 'react-router-dom';
import Index from '../Index';
import Home from '../Home';
import NotFound from '../NotFound';
import Cart from '../Cart';
import PizzaPage from '../PizzaPage';

const Router = () => {
    const routes = useRoutes([
    {
      path: '/',
      element: <Index/>,
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
        },
        {
          path: '/pizza/:id',
          element: <PizzaPage/>
        }
      ]
    }
  ]);
  return routes;
}

export default Router
