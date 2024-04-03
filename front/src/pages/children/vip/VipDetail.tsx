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

  const [VipDetailData, setVipDetailData] = useState<VipDetailData>({
    vipAgeGroups: null,
    vipBirth: 0,
    vipId: 0,
    vipNickname: "",
    vipProfile: 0,
  });

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
        await deleteVip(vipId);
        alert("VIP가 성공적으로 삭제되었습니다.");
        navigate(`/mypage/${id}/vip`);
      }
    } catch (error) {
      console.error("VIP 삭제 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="box-border flex flex-col w-2/3 p-3">
      <div className="flex flex-row justify-between w-full my-3 ">
        <div className="flex my-3">
          <Link to={`/mypage/${id}/vip`} className="pr-3">
            <ArrowBackIcon fontSize="large" />
          </Link>
          <h1 className="text-2xl font-bold">
            {VipDetailData?.vipNickname} 님의 정보
          </h1>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-[600px]">
          <div className="flex w-full p-4 border rounded-md">
            <img
              src={require(`../../../assets/profiles/profile${VipDetailData?.vipProfile}.jpg`)}
              alt="VIP 프로필 이미지"
              className="w-[192px] h-[192px]"
            />
            <div className="flex flex-col justify-center max-w-[250px] ml-14">
              <p className="flex w-full mb-2">
                <span className="font-semibold w-28">닉네임</span>
                <span>{VipDetailData?.vipNickname}</span>
              </p>
              <p className="flex w-full mb-2">
                <span className="font-semibold w-28">태어나신 해</span>
                <span>{VipDetailData?.vipBirth}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 my-3">
            <ButtonAsset
              text="삭제"
              className="font-semibold text-white bg-red-600"
              onClick={() => handleDelete(vipId)}
            />
            <Link to={`/mypage/${id}/vip/${vipId}/edit`}>
              <ButtonAsset text="수정하기" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full min-h-52">
        <div className="flex w-full h-full text-xl font-semibold">보관함</div>
        <InfoTab vipId={vipIndex} />
      </div>
    </div>
  );
}
