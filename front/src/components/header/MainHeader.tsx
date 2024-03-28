import LogoutIcon from '@mui/icons-material/Logout';
import VipTestData from "../../json/VipTestData.json";
import { NavLink, useNavigate } from "react-router-dom";
import useTabStore from '../../store/useTabStore';

interface MainHeaderProps {
  isLogin: boolean;
}

export default function MainHeader({ isLogin }: MainHeaderProps) {
  const navigate = useNavigate();
  const {tabIndex, setTabIndex} = useTabStore()
  return (
    <div>
      {isLogin === false ? (
        <div className="w-full h-[80px] flex flex-row justify-between items-center p-2 border-b-2 bg-white box-border">
          <div className="m-3">
            <img
              src="/hyoblin.png"
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
              src="/hyoblin.png"
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
            <NavLink to={`/mypage/1/profile`} className="flex h-full">
              {/* TODO 해당 링크는 임시 */}
              <img src={VipTestData[0].imagePath} alt="profile" className="h-full rounded-full" onClick={() => {
                navigate('/mypage/1/profile')
                setTabIndex(0)
              }} />
              {/* onclick + navigate, settabindex 사용을 통해 탭 인덱스 변경하기 */}
            </NavLink>
            <div className="flex items-center h-full">
              <LogoutIcon fontSize='large'/>
              {/* TODO 로그아웃 기능 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
