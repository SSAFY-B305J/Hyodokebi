import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import InputAsset from "../../../components/common/InputAsset";
import { getMemberInfo, putMemberInfo } from "../../../apis/api/member";
import Member from "../../../modules/types/member";
import useLoginStore from "../../../store/useLoginStore";

export default function ProfileEdit() {
  const imageIndexList = Array.from({ length: 8 }, (v, i) => i);

  const params = useParams();
  const navigate = useNavigate();
  const { loginMember, updateLoginMember } = useLoginStore();

  const [profileIndex, setProfileIndex] = useState(loginMember?.memberProfile);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = async () => {
    try {
      // 회원 정보 수정
      await putMemberInfo(Number(params.id), {
        memberEmail: email,
        memberNickname: nickname,
        memberProfile: profileIndex,
      });

      // 수정된 회원 정보로 업데이트
      updateLoginMember();

      alert("회원 정보가 수정되었습니다!");
      navigate(`/mypage/${params.id}/profile`);
    } catch (error) {
      console.error(error);
    }
  };

  async function initMemberInfo() {
    const data: Member = await getMemberInfo().then((res) => res?.info);

    setProfileIndex(data.memberId);
    setNickname(data.memberNickname);
    setEmail(data.memberEmail);
    setProfileIndex(data.memberProfile);
  }

  useEffect(() => {
    initMemberInfo();
  }, []);

  return (
    <div className="w-[600px]">
      <div className="flex flex-col w-full p-4 my-10 border rounded-md">
        <div className="flex my-3">
          <Link to={`/mypage/${params.id}/profile/`} className="pr-3">
            <ArrowBackIcon fontSize="large" />
          </Link>
          <h1 className="text-2xl font-bold">회원 정보 수정</h1>
        </div>
        <div className="w-full py-8 border-b">
          <h2 className="mb-3 text-lg font-bold">프로필 사진</h2>
          <div className="flex w-full">
            <img
              src={require(`../../../assets/profiles/profile${profileIndex}.jpg`)}
              alt="empty"
              className="mr-3 w-36 h-36"
            />
            <div className="flex flex-wrap justify-between content-between w-[300px] h-36">
              {imageIndexList.map((imgIdx) => (
                <img
                  key={imgIdx}
                  src={require(`../../../assets/profiles/profile${imgIdx}.jpg`)}
                  alt="프로필 사진을 지정하세요"
                  className={`w-16 h-16 ${
                    profileIndex === imgIdx + "" &&
                    "border-[3px] border-primary rounded-full"
                  }`}
                  onClick={() => setProfileIndex(imgIdx + "")}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full py-8 border-b">
          <h2 className="mb-3 text-lg font-bold">닉네임</h2>
          <InputAsset
            value={nickname}
            placeholder="닉네임"
            className="w-[300px]"
            onInput={(e) => setNickname(e.currentTarget.value)}
          />
        </div>
        <div className="w-full py-8">
          <h2 className="mb-3 text-lg font-bold">이메일</h2>
          <InputAsset
            value={email}
            placeholder="이메일"
            className="w-[300px]"
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="flex justify-center w-full my-5">
          <ButtonAsset
            text="취소"
            variant="outlined"
            className="w-24 mr-8"
            onClick={() => navigate(`/mypage/${params.id}/profile/`)}
          />
          <ButtonAsset text="저장" className="w-24" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
