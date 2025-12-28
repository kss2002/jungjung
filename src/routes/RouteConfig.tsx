import { App } from '../pages/App';
import { NotFound } from '../pages/NotFound';

export const routeConfig = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
