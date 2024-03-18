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
        element : <VipPage />
        //TODO children을 통해 food 이하 라우터 배분할것, 현재 element는 테스트용
        // TODO 이곳이 맞는지? 지민이한테 확인하기

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
