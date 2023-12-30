import '@/styles/global.css';
import '@/styles/fonts.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { Providers } from '@/providers';
import { AppRoutes } from '@/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={AppRoutes} />
    </Providers>
  </React.StrictMode>
);
