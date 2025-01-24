import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "~/styles/global.scss";

import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";

createRoot(document.body).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
