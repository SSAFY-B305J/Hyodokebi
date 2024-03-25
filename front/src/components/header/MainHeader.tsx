import hyoblin from "../../assets/hyoblin.png";
import club from "../../assets/club.png";
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
                // sessionStorage.removeItem("recommend-state");
                sessionStorage.clear()
                window.location.reload()
            }}
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
            <Link to="/">
              <img src={hyoblin} alt="" />
            </Link>
          </div>
          <div className="flex gap-5 m-3">
            <div>
              <img src={club} alt="" />
            </div>
            <div>
              <img src="" alt="" />
              {/* 프로필 아이콘 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
