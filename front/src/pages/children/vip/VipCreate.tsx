import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Input from "../../../components/common/Input";
import MenuCard from "../../../components/card/MenuCard";
import ButtonAsset from "../../../components/Button/ButtonAsset";

interface VipCreateData {
  vipAgeGroups: null;
  vipBirth: number;
  vipId: number;
  vipNickname: string;
  vipProfile: number;
}

export default function VipCreate() {
  const navigate = useNavigate();
  const [vipData, setVipdata] = useState({
    vipAgeGroups: "",
    vipBirth: 0,
    vipId: 0,
    vipNickname: "",
    vipProfile: 0,
  });

  // const [ageGroups, setAgegroups] = useState([]);
  const [birth, setBirth] = useState(0);
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState(0);

  const { id } = useParams();

  const handleClick = () => {
    console.log(vipData);
    navigate(`/mypage/${id}/vip`);
  };

  useEffect(() => {
    setVipdata((vipData) => ({
      ...vipData,
      vipBirth: birth,
      vipNickname: nickname,
      vipProfile: profile,
    }));
  }, [birth, nickname, profile]);
  // POST 확인
  return (
    <div className="box-border flex flex-col justify-between w-3/5 h-[85vh]">
      <div className="flex flex-row justify-between w-full my-2">
        <div className="flex text-2xl font-semibold">VIP 추가</div>
        <ArrowBackIcon
          fontSize="large"
          onClick={() => navigate(`/mypage/${id}`)}
        />
      </div>
      <div className="flex w-3/4 m-2">
        <Input
          id="nickname"
          label="닉네임"
          inputHandler={(event) => setNickname(event.target.value)}
        />
      </div>
      <div className="m-2 font-semibold">프로필 사진</div>
      <div className="flex w-full">
        <img
          src={`/test/picture${profile}.jpg`}
          alt="empty"
          className="mx-3 w-[108px] h-[108px]"
        />
        <div className="grid grid-cols-4 gap-3">
          <img
            src={`/test/picture0.jpg`}
            alt="empty"
            onClick={() => setProfile(0)}
          />
          <img
            src={`/test/picture1.jpg`}
            alt="empty"
            onClick={() => setProfile(1)}
          />
          <img
            src={`/test/picture2.jpg`}
            alt="empty"
            onClick={() => setProfile(2)}
          />
          <img
            src={`/test/picture3.jpg`}
            alt="empty"
            onClick={() => setProfile(3)}
          />
          <img
            src={`/test/picture4.jpg`}
            alt="empty"
            onClick={() => setProfile(4)}
          />
          <img
            src={`/test/picture5.jpg`}
            alt="empty"
            onClick={() => setProfile(5)}
          />
          <img
            src={`/test/picture6.jpg`}
            alt="empty"
            onClick={() => setProfile(6)}
          />
          <img
            src={`/test/picture7.jpg`}
            alt="empty"
            onClick={() => setProfile(7)}
          />
        </div>
      </div>
      <div className="box-border flex m-2 font-semibold">선호 음식</div>
      <div className="flex w-full h-[64vh] p-2 overflow-auto">
        <div className="grid w-full h-full grid-cols-5 gap-3">
          <MenuCard />
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <ButtonAsset text="저장" onClick={handleClick} />
      </div>
    </div>
  );
}
