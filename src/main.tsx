import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { IndexRoute } from './routes/IndexRoute';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IndexRoute />
  </StrictMode>
);
