import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import "./index.css";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
  );
  
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement : <ErrorPage />
  }
])

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={router} />
);
