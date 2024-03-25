import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import DoubleTab from "./components/tab/DoubleTab";
import VipCreate from "./components/vip/VipCreate";
import VipList from "./components/vip/VipList";
import TopicBox from "./components/topic/TopicBox";
import VipEdit from "./components/vip/VipEdit";
import VipDetail from "./components/vip/VipDetail";
import KakaoLogin from "./components/user/KakaoLogin";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import RegFormPage from "./pages/user/RegFormPage";
import FoodListPage from "./pages/FoodListPage";
import FoodResult from "./pages/FoodResult";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import Mypage from "./pages/Mypage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// ALERT usestate는 최상단 경로에서는 사용불가

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <MainPage />,
        children: [
          {
            path: "",
            element: <TopicBox isLogin={true} />,
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
                children: [
                  {
                    path: "",
                    element: <VipList />,
                  },
                ],
              },
              {
                path: "vip/:vipId",
                element: <VipDetail />,
              },
              {
                path: "vip/create",
                element: <VipCreate />,
              },
              {
                path: "vip/:vipId/edit",
                element: <VipEdit />,
              },
            ],
          },
          {
            path: "signup",
            children: [
              {
                path: "",
                element: <SignupPage />,
              },
              {
                path: "regform",
                element: <RegFormPage />,
              },
            ],
          },
          {
            path: "food/list",
            element: <FoodListPage />,
          },
          {
            path: "food/result",
            element: <FoodResult />,
          },
        ],
      },
      {
        path: "oauth",
        element: <KakaoLogin />,
      },
      {
        path: "food/choice/:id",
        // TODO children을 통해 food 이하 라우터 배분할 것.
        // TODO 음식 추천 기능 중첩 라우터 적용 예정
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
