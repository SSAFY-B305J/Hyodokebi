import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import InputAsset from "../../../components/common/InputAsset";

export default function ProfileEdit() {
  const imageList = Array.from({ length: 8 }, (v, i) => i);
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
    setProfileData((ProfileData) => ({
      ...ProfileData,
      nickname: nickname,
      profileImageIndex: index,
      email: email,
    }));
    navigate(`/mypage/${Id}/profile/`);
    console.log(ProfileData);
  };
  useEffect(() => {
    setProfileData((ProfileData) => ({
      ...ProfileData,
      nickname: nickname,
      profileImageIndex: index,
      email: email,
    }));
  }, [nickname, index, email]);

  return (
    <div className="w-[600px]">
      <div className="flex flex-col w-full p-4 my-10 border rounded-md">
        <div className="flex my-3">
          <Link to={`/mypage/1/profile/`} className="pr-3">
            <ArrowBackIcon fontSize="large" />
          </Link>
          <h1 className="text-2xl font-bold">회원 정보 수정</h1>
        </div>
        <div className="w-full py-5 border-b">
          <h2 className="mb-3 text-lg font-bold">프로필 사진</h2>
          <div className="flex w-full">
            <img
              src={`/test/picture${index}.jpg`}
              alt="empty"
              className="mr-3 w-36 h-36"
            />
            <div className="flex flex-wrap justify-between content-between w-[300px] h-36">
              {imageList.map((img) => (
                <img
                  key={img}
                  src={`/test/picture${img}.jpg`}
                  alt="프로필 사진을 지정하세요"
                  className={`w-16 h-16 ${
                    index === img && "border-2 border-primary box-border"
                  }`}
                  onClick={() => setIndex(img)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full py-5 border-b">
          <h2 className="mb-3 text-lg font-bold">닉네임</h2>
          <InputAsset value="" placeholder="닉네임" className="w-[300px]" />
        </div>
        <div className="w-full py-5">
          <h2 className="mb-3 text-lg font-bold">이메일</h2>
          <InputAsset value="" placeholder="이메일" className="w-[300px]" />
        </div>
        <div className="flex justify-center w-full my-5">
          <ButtonAsset
            text="취소"
            variant="outlined"
            className="w-24 mr-8"
            onClick={() => navigate("/mypage/1/profile/")}
          />
          <ButtonAsset text="저장" className="w-24" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
