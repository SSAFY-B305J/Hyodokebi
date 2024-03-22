import { useParams } from "react-router";
import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonAsset from "../Button/ButtonAsset";
import VipTestData from "../../json/VipTestData.json";

interface Params {
  [key: string]: string;
}

export default function VipDetail() {
  const { id, vipId } = useParams<Params>();

  if (vipId === undefined) {
    return <div>VIP ID가 없습니다.</div>; // vipId가 없는 경우 처리할 수 있는 로직을 추가합니다.
  }
  console.log(VipTestData);
  const vipIndex = parseInt(vipId) - 1;
  
  return (
    <div className="box-border flex flex-col w-2/3 h-full p-3">
      <div className="flex flex-row justify-between my-3 w-full h-[10%] ">
        <div className="flex text-2xl font-semibold">
          {VipTestData[vipIndex].name} 님의 정보
        </div>
        <Link to={`/mypage/${id}`}>
          <ArrowBackIcon fontSize="large" />
        </Link>
      </div>
      <div className="flex flex-col justify-center w-full m-2 h-1/2">
        <div className="flex flex-row justify-center w-2/3 gap-32 h-2/3 ">
          <img
            src={`/test/picture${VipTestData[vipIndex].imageIndex}.jpg`}
            alt=""
            className="w-1/4 h-full"
          />
          <div className="flex flex-col justify-between">
            <p className="font-semibold">
              닉네임 : {VipTestData[vipIndex].name}
            </p>
            <p className="font-semibold">
              나이대 : {VipTestData[vipIndex].ageRange}
            </p>
            <p className="font-semibold">지역 : {VipTestData[vipIndex].city}</p>
            {/* TODO DB에서 얻은 정보 입력 */}
          </div>
        </div>
        <div className="flex justify-end gap-3 my-3 ">
          <ButtonAsset
            text="삭제"
            className="font-semibold text-white bg-red-600"
            onClick={
              () => alert("정말 삭제 하시겠습니까?")
              // Test
            }
          />
          <Link to={`/mypage/${id}/vip/${vipId}/edit`}>
            <ButtonAsset text="수정하기" />
          </Link>
          {/* TODO 수정 페이지로 */}
        </div>
      </div>
      <div className="flex w-full h-[30%]">
        <div className="flex w-full h-full text-xl font-semibold">보관함</div>
        {/* VIP 정보 */}
      </div>
    </div>
  );
}
