import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routeConfig } from './RouteConfig';

const indexRouter = createBrowserRouter(routeConfig);

export const IndexRoute = () => {
  return <RouterProvider router={indexRouter} />;
};
