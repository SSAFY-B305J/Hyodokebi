import { useNavigate } from "react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function VipDetail() {

  const navigate = useNavigate();

  return (
    <div className="box-border flex flex-col justify-between flex-1 w-full">
      <div className="flex flex-row justify-between my-3">
        <div className="flex text-2xl font-semibold">
          VIP 님의 정보
        </div>
        <ArrowBackIcon fontSize="large" onClick={() => navigate(-1)} />
      </div>
      <div className="flex w-3/4 m-2"></div>
    </div>
  );
}
