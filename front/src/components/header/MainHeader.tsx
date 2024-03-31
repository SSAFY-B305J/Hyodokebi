import VipTestData from "../../json/VipTestData.json";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import useLoginStore from "../../store/useLoginStore";
import logo from "../../assets/logo.png";

interface MainHeaderProps {
  isLogin: boolean;
}

export default function MainHeader({ isLogin }: MainHeaderProps) {
  const navigate = useNavigate();
  const { loginMemberId } = useLoginStore();

  return (
    <div>
      {isLogin === false ? (
        <div className="w-full h-[70px] flex flex-row justify-between items-center p-2 border-b-2 bg-white box-border">
          <div className="m-3">
            <img
              src={logo}
              alt="logo"
              onClick={() => {
                navigate("/");
                sessionStorage.removeItem("recommend-state");
              }}
              className="h-12 cursor-pointer"
            />
          </div>
          <div className="flex gap-5 m-3">
            <NavLink
              to="/signup"
              className="font-semibold hover:text-primary-hover"
            >
              회원가입
            </NavLink>
            <NavLink
              to="/login"
              className="font-semibold hover:text-primary-hover"
            >
              로그인
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="w-full h-[70px] flex flex-row justify-between items-center p-2 border-b-2 bg-white">
          <div className="m-3">
            <img
              src={logo}
              alt="logo"
              onClick={() => {
                navigate("/");
                sessionStorage.removeItem("recommend-state");
              }}
              className="h-12 cursor-pointer"
            />
          </div>
          <div className="flex items-center h-full gap-10 mr-5">
            <Link
              to="/music"
              className="font-semibold hover:text-primary-hover"
            >
              노래 추천
            </Link>
            <Link
              to={`food/choice/${loginMemberId}`}
              className="font-semibold hover:text-primary-hover"
            >
              음식 추천
            </Link>
            <ProfileMenu image={VipTestData[0].imagePath} />
          </div>
        </div>
      )}
    </div>
  );
}
