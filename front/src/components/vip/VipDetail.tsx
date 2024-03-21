import { useParams } from "react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonAsset from "../Button/ButtonAsset";
import { Link } from "react-router-dom";

export default function VipDetail() {
  const { id, vipId } = useParams();

  return (
    <div className="box-border flex flex-col flex-1 p-3">
      <div className="flex flex-row justify-between my-3">
        <div className="flex text-2xl font-semibold">VIP 님의 정보</div>
        <Link to={`/mypage/${id}`}>
          <ArrowBackIcon fontSize="large" />
        </Link>
      </div>
      <div className="flex flex-col justify-center w-full h-full m-2">
        <div className="flex flex-row justify-around w-2/3 h-1/2 ">
          <img src="https://picsum.photos/128/128" alt="" />
          <div className="flex flex-col justify-between">
            <p className="font-semibold">닉네임 : {}</p>
            <p className="font-semibold">나이대 : {}</p>
            <p className="font-semibold">지역 : {}</p>
            {/* TODO DB에서 얻은 정보 입력 */}
          </div>
        </div>
        <div className="flex justify-end gap-3 my-3">
          <ButtonAsset
            text="삭제"
            className="font-semibold text-white bg-red-600"
            onClick={() =>
              alert("정말 삭제 하시겠습니까?")
              // Test
            }
          />
          <Link to={`/mypage/${id}/vip/${vipId}/edit`}>
            <ButtonAsset text="수정하기" />
          </Link>
          {/* TODO 수정 페이지로 */}
        </div>
        <div className="flex w-2/3">
          <div className="flex text-xl font-semibold">보관함</div>
          {/* VIP 정보 */}
        </div>
      </div>
    </div>
  );
}
