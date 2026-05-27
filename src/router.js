import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Project from "./pages/Project.jsx";

export const routes = [
  {
    path: "/",
    element: React.createElement(App),
    children: [
      { index: true, element: React.createElement(Home) },
      { path: "about", element: React.createElement(About) },
      { path: "contact", element: React.createElement(Contact) },
      { path: "projects", element: React.createElement(Project) },
    ],
  },
];

export function createAppRouter() {
  return createBrowserRouter(routes);
}
