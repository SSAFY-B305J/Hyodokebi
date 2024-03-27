import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import DoubleTab from "./components/tab/DoubleTab";
import KakaoLogin from "./components/user/KakaoLogin";
import TopicBox from "./components/topic/TopicBox";
import VipCreate from "./pages/children/vip/VipCreate";
import VipList from "./pages/children/vip/VipList";
import VipEdit from "./pages/children/vip/VipEdit";
import VipDetail from "./pages/children/vip/VipDetail";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import Mypage from "./pages/children/Mypage";
import LoginForm from "./pages/children/user/LoginForm";
import SignupForm from "./pages/children/user/SignupForm";
import RegForm from "./pages/children/user/RegForm";
import FoodList from "./pages/children/food/FoodList";
import FoodResult from "./pages/children/food/FoodResult";
import ProfileDetail from "./pages/children/profile/ProfileDetail";
import ProfileEdit from "./pages/children/profile/ProfileEdit";

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
        children: [
          {
            path: "",
            element: <TopicBox isLogin={true} />,
          },
          {
            path: "login",
            element: <LoginForm />,
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
                    path: "profile",
                    element: <ProfileDetail />
                  },
                  {
                    path: "vip",
                    element: <VipList />,
                  },
                  {
                    path: "profile/edit",
                    element: <ProfileEdit />
                  }
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
                element: <SignupForm />,
              },
              {
                path: "regform",
                element: <RegForm />,
              },
            ],
          },
          {
            path: "food/list",
            element: <FoodList />,
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
