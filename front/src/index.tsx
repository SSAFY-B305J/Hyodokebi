import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import DoubleTab from "./components/tab/DoubleTab";
import VipCreate from "./pages/children/vip/VipCreate";
import VipList from "./pages/children/vip/VipList";
import TopicBox from "./components/topic/TopicBox";
import VipEdit from "./pages/children/vip/VipEdit";
import VipDetail from "./pages/children/vip/VipDetail";
import LoginPage from "./pages/children/user/LoginPage";
import SignupPage from "./pages/children/user/SignupPage";
import RegFormPage from "./pages/children/user/RegFormPage";
import FoodResult from "./pages/children/food/FoodResultPage";
import KakaoLogin from "./components/user/KakaoLogin";
import FoodListPage from "./pages/children/food/FoodListPage";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import Mypage from "./pages/children/Mypage";

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
