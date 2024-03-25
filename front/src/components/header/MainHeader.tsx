import hyoblin from "../../assets/hyoblin.png";
import club from "../../assets/club.png";
import VipTestData from "../../json/VipTestData.json";
import { Link, NavLink, useNavigate } from "react-router-dom";

interface MainHeaderProps {
  isLogin: boolean;
}

export default function MainHeader({ isLogin }: MainHeaderProps) {
  const navigate = useNavigate();

  return (
    <div>
      {isLogin === false ? (
        <div className="w-full h-[80px] flex flex-row justify-between items-center p-2 border-b-2 bg-white box-border">
          <div className="m-3">
            <img
              src={hyoblin}
              alt="logo"
              onClick={() => {
                navigate("/");
                window.location.reload()
                sessionStorage.clear()
            }}
            className="cursor-pointer"
            />
          </div>
          <div className="flex gap-5 m-3">
            <NavLink to='/signup' className="text-2xl font-semibold">회원가입</NavLink>
            <NavLink to='/login' className="text-2xl font-semibold">로그인</NavLink>
          </div>
        </div>
      ) : (
        <div className="w-full h-[80px] flex flex-row justify-between items-center p-2 border-b-2 bg-white">
          <div className="m-3">
          <img
              src={hyoblin}
              alt="logo"
              onClick={() => {
                navigate("/");
                window.location.reload()
                sessionStorage.clear()
            }}
            className="cursor-pointer "
            />
          </div>
          <div className="flex h-full gap-10 mr-5">
            <div className="flex h-full">
              <img src={club} alt="" />
            </div>
            <NavLink to={`/mypage/1`} className="flex h-full">
              {/* TODO 해당 링크는 임시 */}
              <img src={VipTestData[0].imagePath} alt="profile" className="h-full rounded-full" />
              {/* 프로필 아이콘 */}
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
