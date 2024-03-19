import Button from "../Button/Button";
import { InputAsset } from "./InputAsset";

export default function TextField() {
  return (
    <div className="relative w-[500px]">
      <label className="inline-block pb-1 font-bold">아이디</label>
      <div className="flex w-full">
        <InputAsset placeholder="아이디" />
        <Button text="중복확인" className="ml-2" />
      </div>
      <p className="inline-block text-xs">오류 메시지가 표시됩니다.</p>
    </div>
  );
}
