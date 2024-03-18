import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import Mypage from "./pages/Mypage";
import VipPage from "./pages/VipPage";


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
            path : "vip/:vipId",
          }
        ]
      },
      {
        path : "food/choice/:id",
        // TODO children을 통해 food 이하 라우터 배분할 것.

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
