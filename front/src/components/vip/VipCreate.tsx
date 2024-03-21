import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// TODO 뒤로가기 기능

import Input from "../common/Input";
import MenuCard from "../card/MenuCard";
import ButtonAsset from "../Button/ButtonAsset";

export default function VipCreate() {
  const [vipData, setVipdata] = useState({
    nickname: "",
    image: 0
  });
  // TODO 초기값을 차후 DB에서 받을 것
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const handleClick = () => {
    console.log(vipData)
    navigate(`/mypage/${id}`);
    setVipdata({ nickname: text,
    image: index });
  };
  const [index, setIndex] = useState(0);
  
  // TODO 초기 인덱스 상태 관리 방안 고려, 회원 데이터에 넣을 수도?

  useEffect(() => {
    console.log(vipData);
  }, [vipData]);
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
        {/* 무한스크롤 고려? */}
      </div>
      <div className="flex justify-center mt-3">
        <ButtonAsset text="저장" onClick={handleClick} />
      </div>
    </div>
  );
}
