import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../common/Input";
import MenuCard from "../card/MenuCard";
import ButtonAsset from "../Button/ButtonAsset";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// TODO 뒤로가기 기능

export default function VipEdit() {
  const [vipData, setVipdata] = useState({
    nickname: "",
  });
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const { id, vipId } = useParams();
  const handleClick = () => {
    setVipdata({ nickname: text });
    // 구조 변경 필요성
    navigate(`/mypage/${id}`);
  };

  useEffect(() => {
    console.log(id, vipId);
    console.log(vipData);
  }, [vipData, id, vipId]);
  // PUT 확인
  return (
    <div className="box-border flex flex-col justify-between w-3/5 h-[85vh]">
      <div className="flex justify-center my-2 text-3xl font-semibold">
        VIP 수정
      </div>
      <div className="flex w-3/4 m-2">
        <Input
          id="nickname"
          label="닉네임"
          inputHandler={(event) => setText(event.target.value)}
        />
      </div>
      <div className="m-2 font-semibold">프로필 사진</div>
      <div className="flex w-full">
        <img src="https://picsum.photos/96/96" alt="empty" className="mx-3" />
        <div className="grid grid-cols-4 gap-3">
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
          <img src="https://picsum.photos/48/48" alt="empty" />
        </div>
      </div>
      <div className="box-border flex m-2 font-semibold">선호 음식</div>
      <div className="flex w-full h-[64vh] p-2 overflow-auto">
        <div className="grid w-full h-full grid-cols-5 gap-3">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </div>
        {/* 무한스크롤 고려? */}
      </div>
      <div className="flex flex-row justify-center gap-2 mt-3">
        <ButtonAsset text="삭제" className="font-semibold text-white bg-red-600" />
        <ButtonAsset
          text="수정"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
