import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import Mypage from "./pages/Mypage";
import DoubleTab from "./components/tab/DoubleTab";
import VipCreate from "./components/vip/VipCreate";
import VipList from "./components/vip/VipList";
import TopicBox from "./components/topic/TopicBox";
import VipEdit from "./components/vip/VipEdit";
import VipDetail from "./components/vip/VipDetail";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import RegFormPage from "./pages/user/RegFormPage";
import FoodListPage from "./pages/food/FoodListPage";
import FoodResult from "./pages/food/FoodResultPage";
import KakaoLogin from "./components/user/KakaoLogin";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const isLogin = true;
// TODO isLogin 임시.
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
            element: <TopicBox isLogin={isLogin} />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
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
        path: "oauth",
        element: <KakaoLogin />,
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
        path: "food/choice/:id",
        // TODO children을 통해 food 이하 라우터 배분할 것.
        // TODO 음식 추천 기능 중첩 라우터 적용 예정
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
]);

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={router} />
);
