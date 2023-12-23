import { createRoutesFromElements, Route } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import { Base } from "@/web/layouts/Base";
import { HomePage } from "@/web/pages/Home";
import { NotFoundPage } from "@/web/pages/NotFound";

export const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Base />}>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);
