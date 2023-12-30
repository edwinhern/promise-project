import { createRoutesFromElements, Route } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import Base from '@/layouts/Base';
import { FlowerPage } from '@/pages/Flower';
import { NotFoundPage } from '@/pages/NotFound';
import { ToYouPage } from '@/pages/ToYou';

export const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Base />}>
      <Route path="/" element={<ToYouPage />} />
      <Route path="/flower" element={<FlowerPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
