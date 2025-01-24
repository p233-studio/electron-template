import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "~/styles/global.scss";

import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      }
    ]
  }
]);

createRoot(document.body).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
