import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Input from "../../../components/common/Input";
import MenuCard from "../../../components/card/MenuCard";
import ButtonAsset from "../../../components/Button/ButtonAsset";

import { putVip } from "../../../apis/api/vip";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface PutVipData {
  vipAgeGroups: null;
  vipBirth: number;
  vipId: number;
  vipNickname: string;
  vipProfile: number;
}

export default function VipEdit() {
  const { id, vipId } = useParams();
  const navigate = useNavigate();


  // const [ageGroups, setAgegroups] = useState([]);
  const [birth, setBirth] = useState(0);
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState(9);

  const vipIndex = vipId ? parseInt(vipId) : NaN;

  const [vipData, setVipData] = useState({
    vipAgeGroups: "",
    vipBirth: 0,
    vipId: 0,
    vipNickname: "",
    vipProfile: 9,
  });
  
  const handleClick = async () => {
    if (birth !== 0 && nickname !== "" && profile !== 9)
    // ALERT 빈 값으로 두면 안되는 조건 추가, 조건 추가시 확인.
    {
    try {
      await putVip(vipIndex, {
        vipBirth: birth,
        vipNickname: nickname,
        vipProfile: profile,
      });
      console.log("VIP 수정");

      navigate(`/mypage/${id}/vip/${vipId}`);
    } catch (error) {
      console.error("Error updating VIP:", error);
    }
  }
  else {
    if (birth === 0 ){
      alert("태어나신 해를 입력해주세요.")
    }
    else if (nickname === "") {
      alert("닉네임을 입력해주세요.")
    }
    else {
      alert("프로필 사진을 선택하세요")
    }
  }
  };

  useEffect(() => {
    setVipData((vipData) => ({
      ...vipData,
      vipBirth: birth,
      vipNickname: nickname,
      vipProfile: profile,
    }));
  }, [birth, nickname, profile]);

  const arr = Array.from({ length: 8 }, (v, i) => i);

  return (
    <div className="box-border flex flex-col justify-between w-3/5 h-[85vh]">
      <div className="flex justify-between w-full my-2 text-3xl font-semibold">
        VIP 수정
        <Link to={`/mypage/${id}/vip/${vipId}`}>
          <ArrowBackIcon fontSize="large" />
        </Link>
      </div>
      <div className="flex w-3/4 m-2">
        <Input
          id="nickname"
          label="닉네임"
          inputHandler={(event) => setNickname(event.target.value)}
        />
      </div>
      <div className="flex w-3/4 m-2">
        <Input
          id="birth"
          label="태어나신 해"
          inputHandler={(event) => setBirth(parseInt(event.target.value))}
        />
      </div>
      <div className="m-2 font-semibold">프로필 사진</div>
      <div className="flex w-full">
        <img
          src={`/test/picture${profile}.jpg`}
          alt="사진을 선택하세요."
          className="mx-3 w-[108px] h-[108px] border"
        />
        <div className="grid grid-cols-4 gap-3">
          {arr.map((x) => (
            <img
              key={x}
              src={`/test/picture${x}.jpg`}
              alt="empty"
              onClick={() => setProfile(x)}
            />
          ))}
        </div>
      </div>
      {/* <div className="box-border flex m-2 font-semibold">선호 음식</div>
      <div className="flex w-full h-[64vh] p-2 overflow-auto">
        <div className="grid w-full h-full grid-cols-5 gap-3">
          <MenuCard />
        </div>
      </div> */}
      <div className="flex flex-row justify-center gap-2 mt-3">
        <ButtonAsset
          text="취소"
          variant="outlined"
          onClick={() => navigate(`/mypage/${id}/vip/${vipId}`)}
        />
        <ButtonAsset text="저장" onClick={handleClick} />
      </div>
    </div>
  );
}
