import { useState } from "react";
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
    // vipData가 바뀌지 않는것 조치.
  };
  const [index, setIndex] = useState(0);

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
        <img
          src={`/test/picture${index}.jpg`}
          alt="empty"
          className="mx-3 w-[108px] h-[108px]"
        />
        <div className="grid grid-cols-4 gap-3">
          <img
            src={`/test/picture0.jpg`}
            alt="empty"
            onClick={() => setIndex(0)}
          />
          <img
            src={`/test/picture1.jpg`}
            alt="empty"
            onClick={() => setIndex(1)}
          />
          <img
            src={`/test/picture2.jpg`}
            alt="empty"
            onClick={() => setIndex(2)}
          />
          <img
            src={`/test/picture3.jpg`}
            alt="empty"
            onClick={() => setIndex(3)}
          />
          <img
            src={`/test/picture4.jpg`}
            alt="empty"
            onClick={() => setIndex(4)}
          />
          <img
            src={`/test/picture5.jpg`}
            alt="empty"
            onClick={() => setIndex(5)}
          />
          <img
            src={`/test/picture6.jpg`}
            alt="empty"
            onClick={() => setIndex(6)}
          />
          <img
            src={`/test/picture7.jpg`}
            alt="empty"
            onClick={() => setIndex(7)}
          />
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
      </div>
      <div className="flex flex-row justify-center gap-2 mt-3">
        <ButtonAsset
          text="삭제"
          className="font-semibold text-white bg-red-600"
          onClick={
            () => alert("정말 삭제 하시겠습니까?")
            // Test
          }
        />
        <ButtonAsset text="수정" onClick={handleClick} />
      </div>
    </div>
  );
}
