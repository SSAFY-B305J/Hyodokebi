import { Outlet } from "react-router-dom";
import useTabStore from "../../store/useTabStore";

export default function InfoTab() {
  const { tabIndex, setTabIndex } = useTabStore();

  const disabled =
    "flex items-center justify-center w-1/2 shadow-md h-full duration-300 text-xl font-semibold border-b border-current";
  const activated =
    "flex items-center justify-center w-1/2 shadow-md h-full bg-secondary duration-300 text-xl font-semibold border-current border-t border-l border-r";

  return (
    <div className="flex flex-col w-[66vw] m-3 h-[10vh] p-2 box-border">
      <div className="flex flex-row w-[66vw] h-[8vh] box-border">
        <div
          className={tabIndex === 0 ? activated : disabled}
          onClick={() => setTabIndex(0)}
        >
          음악
        </div>
        <div
          className={tabIndex === 1 ? activated : disabled}
          onClick={() => setTabIndex(1)}
        >
          음식점
        </div>
        <div
          className={tabIndex === 2 ? activated : disabled}
          onClick={() => setTabIndex(2)}
        >
          좋아하는 메뉴
        </div>
      </div>
      {/* {tabIndex === 0 ? (
        <div className="box-border flex w-[66vw] h-[67vh] p-3">음악</div>
      ) : (
        <Outlet />
      )} */}
    </div>
  );
}
