import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Project from "./pages/Project.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import ToolsLayout from "./pages/tools/ToolsLayout.jsx";

const ToolsHome = React.lazy(() => import("./pages/tools/ToolsHome.jsx"));
const PdfToolsHub = React.lazy(() => import("./pages/tools/PdfToolsHub.jsx"));
const ImageToolsHub = React.lazy(() => import("./pages/tools/ImageToolsHub.jsx"));
const TextToolsHub = React.lazy(() => import("./pages/tools/TextToolsHub.jsx"));
const DevToolsHub = React.lazy(() => import("./pages/tools/DevToolsHub.jsx"));
const ImageToPdf = React.lazy(() => import("./pages/tools/ImageToPdf.jsx"));
const PdfCompressor = React.lazy(() => import("./pages/tools/PdfCompressor.jsx"));
const PdfMerger = React.lazy(() => import("./pages/tools/PdfMerger.jsx"));
const PdfSplitter = React.lazy(() => import("./pages/tools/PdfSplitter.jsx"));
const WordToPdf = React.lazy(() => import("./pages/tools/WordToPdf.jsx"));
const ImageCompressor = React.lazy(() => import("./pages/tools/ImageCompressor.jsx"));
const ImageResizer = React.lazy(() => import("./pages/tools/ImageResizer.jsx"));
const QrCodeGenerator = React.lazy(() => import("./pages/tools/QrCodeGenerator.jsx"));
const JsonFormatter = React.lazy(() => import("./pages/tools/JsonFormatter.jsx"));
const PasswordGenerator = React.lazy(() => import("./pages/tools/PasswordGenerator.jsx"));

function lazyElement(element) {
  return React.createElement(
    React.Suspense,
    { fallback: React.createElement("div", { className: "p-6 text-center text-slate-500" }, "Loading tools...") },
    element,
  );
}

export const routes = [
  {
    path: "/",
    element: React.createElement(App),
    children: [
      { index: true, element: React.createElement(Home) },
      { path: "about", element: React.createElement(About) },
      { path: "contact", element: React.createElement(Contact) },
      { path: "projects", element: React.createElement(Project) },
      { path: "privacy", element: React.createElement(Privacy) },
      { path: "terms", element: React.createElement(Terms) },
      {
        path: "tools",
        element: React.createElement(ToolsLayout),
        children: [
          { index: true, element: lazyElement(React.createElement(ToolsHome)) },
          { path: "pdf-tools", element: lazyElement(React.createElement(PdfToolsHub)) },
          { path: "image-tools", element: lazyElement(React.createElement(ImageToolsHub)) },
          { path: "text-tools", element: lazyElement(React.createElement(TextToolsHub)) },
          { path: "dev-tools", element: lazyElement(React.createElement(DevToolsHub)) },
          { path: "image-to-pdf", element: lazyElement(React.createElement(ImageToPdf)) },
          { path: "pdf-compressor", element: lazyElement(React.createElement(PdfCompressor)) },
          { path: "pdf-merger", element: lazyElement(React.createElement(PdfMerger)) },
          { path: "pdf-splitter", element: lazyElement(React.createElement(PdfSplitter)) },
          { path: "word-to-pdf", element: lazyElement(React.createElement(WordToPdf)) },
          { path: "image-compressor", element: lazyElement(React.createElement(ImageCompressor)) },
          { path: "image-resizer", element: lazyElement(React.createElement(ImageResizer)) },
          { path: "qr-code-generator", element: lazyElement(React.createElement(QrCodeGenerator)) },
          { path: "json-formatter", element: lazyElement(React.createElement(JsonFormatter)) },
          { path: "password-generator", element: lazyElement(React.createElement(PasswordGenerator)) },
        ],
      },
    ],
  },
];

export function createAppRouter() {
  return createBrowserRouter(routes);
}
