import ButtonAsset from "../Button/ButtonAsset";

import { Link, NavLink, useNavigate, useParams } from "react-router-dom";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function AddCard() {
  const { id } = useParams();

  return (
    <NavLink
      className="box-border flex flex-col w-full p-2 m-2 border-2 border-gray-300 shadow-md h-[60vh] rounded-xl"
      to={`/mypage/${id}/vip/create`}
    >
      {/* ALERT width와 height는 확인용으로 넣은 것으로 추후 수정. */}
      <div className="flex items-center justify-center w-full h-2/3">
        <div className="flex items-center justify-center w-2/3 rounded-xl h-4/5 bg-primary">
          <AddCircleOutlineIcon />
        </div>
      </div>
      <div className="flex flex-col items-center justify-end w-full pb-3 h-1/3">
        <Link to={`/mypage/${id}/vip/create`}>
          <ButtonAsset text="VIP 추가하기" variant="outlined" />
        </Link>
      </div>
    </NavLink>
  );
}
