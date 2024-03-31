import { NavLink } from "react-router-dom";

import VipTestData from "../../../json/VipTestData.json";
import EditIcon from "@mui/icons-material/Edit";


export default function ProfileDetail() {
  return (
    <div className="box-border flex flex-col justify-center w-full p-3 h-fit">
      <NavLink to={`edit/`} className="flex justify-end w-full">
        <EditIcon color="primary" fontSize="large" />
      </NavLink>
      <div className="flex flex-row justify-center w-4/5 gap-10">
        <img
          src={VipTestData[0].imagePath}
          alt="profile"
          className="w-[192px] h-[216px]"
        />
        <div className="flex flex-col justify-around w-1/2">
          <p className="font-semibold">닉네임 : {VipTestData[0].name}</p>
          <p className="font-semibold">나이대 : {VipTestData[0].ageRange}</p>
          <p className="font-semibold">지역 : {VipTestData[0].city}</p>
          {/* TODO DB에서 얻은 정보 입력, 현재 테이터는 임시 */}
        </div>
      </div>
    </div>
  );
}
