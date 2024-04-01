import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import InputAsset from "../../../components/common/InputAsset";

export default function ProfileEdit() {
  const imageIndexList = Array.from({ length: 8 }, (v, i) => i);

  const [profileIndex, setProfileIndex] = useState(0);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const { memberId } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      // TODO: 회원 정보 수정 API 추가
      alert("회원 정보가 수정되었습니다!");
      navigate(`/mypage/${memberId}/profile/`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // TODO: 회원 조회 API 추가
    const data = {
      nickname: "ssafy1",
      email: "ssafy1@ssafy.com",
      profileImage: 1,
    };

    setProfileIndex(data.profileImage);
    setNickname(data.nickname);
    setEmail(data.email);
  }, []);

  return (
    <div className="w-[600px]">
      <div className="flex flex-col w-full p-4 my-10 border rounded-md">
        <div className="flex my-3">
          <Link to={`/mypage/${memberId}/profile/`} className="pr-3">
            <ArrowBackIcon fontSize="large" />
          </Link>
          <h1 className="text-2xl font-bold">회원 정보 수정</h1>
        </div>
        <div className="w-full py-5 border-b">
          <h2 className="mb-3 text-lg font-bold">프로필 사진</h2>
          <div className="flex w-full">
            <img
              src={`/test/picture${profileIndex}.jpg`}
              alt="empty"
              className="mr-3 w-36 h-36"
            />
            <div className="flex flex-wrap justify-between content-between w-[300px] h-36">
              {imageIndexList.map((imgIdx) => (
                <img
                  key={imgIdx}
                  src={`/test/picture${imgIdx}.jpg`}
                  alt="프로필 사진을 지정하세요"
                  className={`w-16 h-16 ${
                    profileIndex === imgIdx && "border-[3px] border-primary"
                  }`}
                  onClick={() => setProfileIndex(imgIdx)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full py-5 border-b">
          <h2 className="mb-3 text-lg font-bold">닉네임</h2>
          <InputAsset
            value={nickname}
            placeholder="닉네임"
            className="w-[300px]"
          />
        </div>
        <div className="w-full py-5">
          <h2 className="mb-3 text-lg font-bold">이메일</h2>
          <InputAsset
            value={email}
            placeholder="이메일"
            className="w-[300px]"
          />
        </div>
        <div className="flex justify-center w-full my-5">
          <ButtonAsset
            text="취소"
            variant="outlined"
            className="w-24 mr-8"
            onClick={() => navigate(`/mypage/${memberId}/profile/`)}
          />
          <ButtonAsset text="저장" className="w-24" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
