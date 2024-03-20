import { useEffect, useState } from "react";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// TODO 뒤로가기 기능

import Input from "../common/Input";
import MenuCard from "../card/MenuCard";
import CommonButton from "../button/CommonButton";

export default function VipCreate() {

  const [vipData, setVipdata] = useState({
    nickname: "",
  })
  const [text, setText] = useState("")

  
  useEffect(() => {
    console.log(vipData);
  }, [vipData]);
  // POST 확인
  return (
    <div className="box-border flex flex-col justify-between w-3/5 h-[85vh]">
      <div className="flex justify-center my-2 text-3xl font-semibold">
        VIP 추가
      </div>
      <div className="flex w-3/4 m-2">
        <Input id="nickname" label="닉네임" inputHandler={(event)=>setText(event.target.value)} />
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
      <div className="flex justify-center mt-3">
        <CommonButton text="저장" clickHandler={()=>setVipdata({ nickname: text })} />
      </div>
    </div>
  );
}
