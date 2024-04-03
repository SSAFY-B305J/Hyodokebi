import { Link, NavLink, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import useLoginStore from "../../store/useLoginStore";
import logo from "../../assets/logo.png";
import { useCallback, useEffect } from "react";
import { getMemberInfo } from "../../apis/api/member";

export default function MainHeader() {
  const navigate = useNavigate();
  const { loginMember, getIsLogin, setLoginMember, setLoginMemberIdx } =
    useLoginStore();
  const isLogin = getIsLogin();

  // 로그인한 회원 정보 조회 후 store에 저장
  const initMemberInfo = useCallback(async () => {
    const data = await getMemberInfo().then((res) => res);

    if (data) {
      setLoginMemberIdx(data.idx);
      setLoginMember(data.info);
    }
  }, [setLoginMember, setLoginMemberIdx]);

  useEffect(() => {
    if (isLogin) initMemberInfo();
  }, [initMemberInfo, isLogin]);

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
              to={`food/choice`}
              className="font-semibold hover:text-primary-hover"
            >
              음식 추천
            </Link>
            <ProfileMenu
              image={`/test/picture${loginMember?.memberProfile}.jpg`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
