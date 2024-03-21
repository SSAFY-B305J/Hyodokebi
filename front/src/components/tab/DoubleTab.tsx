import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function DoubleTab() {
  const [index, setIndex] = useState(0);
  // TODO 해당 인덱스를 전역관리 할지?
  // TODO 탭에서 정해진 인덱스를 데이터에도 출력하여 보여주는 방식을 취할지?

  const disabled =
    "flex items-center justify-center w-1/2 shadow-md h-full duration-300 text-xl font-semibold";
  const activated =
    "flex items-center justify-center w-1/2 shadow-md h-full bg-secondary duration-300 text-xl font-semibold";

  return (
    <div className="flex flex-col w-[66vw] m-3 h-[75vh] p-2 box-border">
      <div className="flex flex-row w-[66vw] h-[8vh] box-border">
        <div
          className={index === 0 ? activated : disabled}
          onClick={() => setIndex(0)}
        >
          내 프로필
        </div>
        <div
          className={index === 1 ? activated : disabled}
          onClick={() => setIndex(1)}
        >
          VIP
        </div>
      </div>
      {index === 0 ? (
        <div className="box-border flex w-[66vw] h-[67vh] p-3">프로필</div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
