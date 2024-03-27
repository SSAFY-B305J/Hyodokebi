import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../../components/common/Input";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonAsset from "../../../components/Button/ButtonAsset";

export default function ProfileEdit() {
  const arr = Array.from({ length: 8 }, (v, i) => i);
  const [ProfileData, setProfileData] = useState({
    profileImageIndex: 0,
    nickname: "",
    email: "",
  });
  // TODO usestate의 기본값을 api get으로 읽어오거나, zustand로 처리하거나.

  const { Id } = useParams();

  const [index, setIndex] = useState(0);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/mypage/${Id}/profile/`);
    setProfileData((ProfileData) => ({
      ...ProfileData,
      nickname: nickname,
      profileImageIndex: index,
      email: email
    }));
  };
  useEffect(() => {
    setProfileData((ProfileData) => ({
      ...ProfileData,
      nickname: nickname,
      profileImageIndex: index,
      email: email
    }));
    console.log(ProfileData)
  }, []);
  


  return (
    <div className="box-border flex flex-col justify-center w-5/6 h-full gap-4 px-3 mt-4 overflow-auto">
      <div className="flex flex-row justify-between w-full h-1/6">
        <div className="text-2xl font-semibold">프로필 사진</div>
        <div className="flex gap-8">
          {/* <SaveIcon fontSize="large" /> */}
          <ArrowBackIcon
            fontSize="large"
            onClick={() => navigate("/mypage/1/profile/")}
            className="cursor-pointer "
          />
        </div>
      </div>
      <div className="flex flex-row w-full h-1/2">
        <div className="flex w-full">
          <img
            src={`/test/picture${index}.jpg`}
            alt="empty"
            className="mx-3 w-[116px] h-[116px]"
          />
          <div className="grid grid-cols-4 gap-3">
            {arr.map((x) => (
              <img
                key={x}
                src={`/test/picture${x}.jpg`}
                alt="empty"
                onClick={() => setIndex(x)}
              />
            ))}
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col justify-between w-full gap-3 h-1/3">
        <div className="text-2xl font-semibold">닉네임</div>
        <Input
          id="nickname"
          label="닉네임"
          labelVisible={false}
          inputHandler={(event) => {
            setNickname(event.target.value);
          }}
        />
      </div>
      <hr />
      <div className="flex flex-col justify-between w-full gap-3">
        <div className="text-2xl font-semibold">이메일</div>
        <Input
          id="email"
          label="현재 이메일"
          inputHandler={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="flex justify-center w-full gap-2">
        <ButtonAsset text="취소" variant="outlined" className="w-1/5" onClick={() => navigate("/mypage/1/profile/")} />
        <ButtonAsset text="저장" className="w-1/5" onClick={handleClick} />
      </div>
    </div>
  );
}
