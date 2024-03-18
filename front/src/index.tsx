import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import Mypage from "./pages/Mypage";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
  );
  
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement : <ErrorPage />,
    children: [
      {
        path : "",
        element: <MainPage />
      },
      {
        path : "login",
        // element :
      },
      {
        path : "mypage/:id",
        element : <Mypage />,
        children: [
          {
            path : "vip/:vipId"

          }
        ]
      }
    ]
  }

])

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={router} />
);
