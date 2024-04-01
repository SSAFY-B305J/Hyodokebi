import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonAsset from "../../../components/Button/ButtonAsset";

import { getVip, deleteVip } from "../../../apis/api/vip";
import InfoTab from "../../../components/tab/InfoTab";

interface VipDetailData {
  vipAgeGroups: null;
  vipBirth: number;
  vipId: number;
  vipNickname: string;
  vipProfile: number;
}

export default function VipDetail() {
  const { id, vipId } = useParams();

  const vipIndex = vipId ? parseInt(vipId) : NaN;

  const [VipDetailData, setVipDetailData] = useState<VipDetailData | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVipDetail() {
      try {
        const data = await getVip(vipIndex);
        setVipDetailData(data);
      } catch (error) {
        console.error("Error fetching VIP Detail:", error);
      }
    }

    fetchVipDetail();
  }, []);

  const handleDelete = async (vipId: any) => {
    try {
      const isConfirmed = window.confirm("정말 삭제 하시겠습니까?");
      if (isConfirmed) {
        const result = await deleteVip(vipId);
        console.log("VIP가 성공적으로 삭제되었습니다.", result);
        navigate(`/mypage/${id}/vip`);
      } else {
        console.log("사용자가 삭제를 취소했습니다.");
      }
    } catch (error) {
      console.error("VIP 삭제 중 오류가 발생했습니다:", error);
    }
  };

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
            <p className="font-semibold">
              태어나신 해 : {VipDetailData?.vipBirth}
            </p>
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
            onClick={() => handleDelete(vipId)}
          />
          <Link to={`/mypage/${id}/vip/${vipId}/edit`}>
            <ButtonAsset text="수정하기" />
          </Link>
        </div>
        <div className="flex w-full h-[30%] flex-col">
          <div className="flex w-full h-full text-xl font-semibold">보관함</div>
          <InfoTab vipId={vipIndex} />
        </div>
      </div>
    </div>
  );
}
