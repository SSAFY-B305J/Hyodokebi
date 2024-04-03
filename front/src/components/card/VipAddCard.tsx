import ButtonAsset from "../Button/ButtonAsset";

import { NavLink, useParams } from "react-router-dom";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function AddCard() {
  const { id } = useParams();

  return (
    <NavLink to={`/mypage/${id}/vip/create`}>
      <div className="box-border relative flex flex-col justify-center w-56 p-2 m-2 border-gray-300 shadow-md h-80 rounded-xl border-w">
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex items-center justify-center w-40 h-40 bg-primary rounded-xl">
            <AddCircleOutlineIcon fontSize="large" />
          </div>
        </div>
        <div className="flex items-center justify-center w-full p-3">
          <ButtonAsset text="VIP 추가하기" variant="outlined" />
        </div>
      </div>
    </NavLink>
  );
}
