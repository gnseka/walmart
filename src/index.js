import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Features from "./Features";
import ProductsPage from "./ProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/pricing",
    element: <Features />,
  },
  {
    path: "/category/:categoryName",
    element: <App />,
  },
  {
    path: "/products/:productId",
    element: <ProductsPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
