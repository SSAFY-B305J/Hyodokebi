import { Outlet, useNavigate } from "react-router-dom";
import useTabStore from "../../store/useTabStore";

export default function DoubleTab() {
  const { tabIndex, setTabIndex } = useTabStore();
  const navigate = useNavigate();

  const disabled =
    "flex items-center justify-center w-1/2 shadow-md h-full duration-300 text-xl font-semibold";
  const activated =
    "flex items-center justify-center w-1/2 shadow-md h-full bg-secondary duration-300 text-xl font-semibold";

  return (
    <div className="flex flex-col w-[66vw] m-3 h-[75vh] p-2 box-border">
      <div className="flex flex-row w-[66vw] h-[8vh] box-border">
        <div
          className={tabIndex === 0 ? activated : disabled}
          onClick={() => {
            setTabIndex(0);
            navigate("/mypage/1/profile");
          }}
        >
          내 프로필
        </div>
        <div
          className={tabIndex === 1 ? activated : disabled}
          onClick={() => {setTabIndex(1)
            navigate("/mypage/1/vip")}}
        >
          VIP
        </div>
      </div>
      {tabIndex === 0 ? (
        // <div className="box-border flex w-[66vw] h-[67vh] p-3">프로필</div>
        <Outlet />
      ) : (
        <Outlet />
      )}
    </div>
  );
}
