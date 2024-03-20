import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import Mypage from "./pages/Mypage";
import VipCreatePage from "./pages/VipCreatePage";
import DoubleTab from "./components/tab/DoubleTab";
import VipCreate from "./components/vip/VipCreate";
import path from "path";
import VipList from "./components/vip/VipList";
import LoginPage from "./pages/LoginPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "mypage/:id",
        element: <Mypage />,
        children: [
          {
            path: "",
            element: <DoubleTab />,
            // 여기도 outlet을 걸어서 또 내부 값을 바꿔야 하나?
            children: [
              {
                path: "",
                element: <VipList />,
              },
            ],
          },
          {
            path: "vip/create",
            element: <VipCreate />,
          },
        ],
      },
      {
        path: "food/choice/:id",
        // TODO children을 통해 food 이하 라우터 배분할 것.
      },
    ],
  },
]);

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={router} />
);
