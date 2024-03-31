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
import MusicVipSelect from "./pages/children/music/MusicVipSelect";
import MusicResult from "./pages/children/music/MusicResult";
import ProfileDetail from "./pages/children/profile/ProfileDetail";
import ProfileEdit from "./pages/children/profile/ProfileEdit";
import FoodChoice from "./pages/children/food/FoodChoice";
import FoodAdd from "./pages/children/food/FoodAdd";
import IdInquiryForm from "./pages/children/user/IdInquiryForm";
import IdInquiryResult from "./pages/children/user/IdInquiryResult";
import PwInquiryForm from "./pages/children/user/PwInquiryForm";
import PwInquiryResetForm from "./pages/children/user/PwInquiryResetForm";
import Settings from "./pages/children/profile/Settings";

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
                    element: <ProfileDetail />,
                  },
                  {
                    path: "vip",
                    element: <VipList />,
                  },
                ],
              },
              {
                path: "profile/edit",
                element: <ProfileEdit />,
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
            path: "settings",
            element: <Settings />,
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
            path: "food/choice/:id",
            element: <FoodChoice />,
          },
          {
            path: "food/add/:vipId",
            element: <FoodAdd />,
          },
          {
            path: "food/list",
            element: <FoodList />,
          },
          {
            path: "food/result",
            element: <FoodResult />,
          },
          {
            path: "music",
            element: <MusicVipSelect />,
          },
          {
            path: "music/:vipId",
            element: <MusicResult />,
          },
          {
            path: "/help/idInquiry",
            element: <IdInquiryForm />,
          },
          {
            path: "/help/idInquiry/result",
            element: <IdInquiryResult />,
          },
          {
            path: "/help/pwInquiry",
            element: <PwInquiryForm />,
          },
          {
            path: "/help/pwInquiry/reset",
            element: <PwInquiryResetForm />,
          },
        ],
      },
      {
        path: "oauth",
        element: <KakaoLogin />,
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
