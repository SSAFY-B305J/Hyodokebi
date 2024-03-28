import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonAsset from "../../../components/Button/ButtonAsset";

import { getVip } from "../../../apis/api/vip";

// interface Params {
//   id : string;
//   vipId : string;
// }

interface VipDetailData {
  vipAgeGroups: null;
  vipBirth: number;
  vipId: number;
  vipNickname: string;
  vipProfile : number;
  
}

export default function VipDetail() {
  const { id, vipId } = useParams();

  const vipIndex = vipId ? parseInt(vipId) : NaN;
  

  const [VipDetailData, setVipDetailData] = useState<VipDetailData | null>(null);

  useEffect(() => {
    async function fetchVipDetail() {
      try {
        const data = await getVip(vipIndex);
        setVipDetailData(data);
      } catch (error) {
        console.error('Error fetching VIP Detail:', error);
      }
    }

    fetchVipDetail();
  }, []);



  return (
    <div className="box-border flex flex-col w-2/3 h-full p-3">
      <div className="flex flex-row justify-between my-3 w-full h-[10%] ">
        <div className="flex text-2xl font-semibold">
          {VipDetailData?.vipNickname} 님의 정보
        </div>
        <Link to={`/mypage/${id}/vip`}>
          <ArrowBackIcon fontSize="large" />
        </Link>
      </div>
      <div className="flex flex-col justify-center w-full m-2 h-1/2">
        <div className="flex flex-row justify-center w-2/3 gap-32 h-2/3 ">
          <img
            src={`/test/picture${VipDetailData?.vipProfile}.jpg`}
            alt=""
            className="w-1/4 h-full"
          />
          <div className="flex flex-col justify-between">
            <p className="font-semibold">
              닉네임 : {VipDetailData?.vipNickname}
            </p>
            <p className="font-semibold">태어나신 해 : {VipDetailData?.vipBirth}</p>
            <p className="font-semibold">
              나이대 : {VipDetailData?.vipAgeGroups}
            </p>
            {/* <p className="font-semibold">지역 : {VipTestData[vipIndex].city}</p> */}
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
        </div>
      </div>
      <div className="flex w-full h-[30%]">
        <div className="flex w-full h-full text-xl font-semibold">보관함</div>
        {/* VIP 정보 */}
      </div>
    </div>
  );
}
