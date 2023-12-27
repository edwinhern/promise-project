import { createRoutesFromElements, Route } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { Base } from '@/layouts/Base';
import { HomePage } from '@/pages/Home';
import { NotFoundPage } from '@/pages/NotFound';
import { ThreePage } from '@/pages/Three';

export const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Base />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/three" element={<ThreePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
