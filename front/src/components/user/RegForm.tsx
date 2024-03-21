import TextField from "../common/TextField";
import ButtonAsset from "../Button/ButtonAsset";
import { useState } from "react";

export default function RegForm() {
  const [isEmailAuthStep, setIsEmailAuthStep] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center w-[500px]">
      <h1 className="my-6 text-3xl font-bold">회원가입</h1>
      <div className="w-full *:mb-6">
        <TextField label="아이디" placeholder="아이디" />
        <TextField label="비밀번호" placeholder="비밀번호" />
        <TextField label="비밀번호 확인" placeholder="비밀번호 확인" />
        <TextField
          label="이메일"
          placeholder="이메일"
          buttonText="인증하기"
          buttonVisible
          buttonClickHandler={() => setIsEmailAuthStep(true)}
        />
        {/* 인증번호 입력 - 위의 '인증하기' 버튼을 클릭하면 출력됨 */}
        {isEmailAuthStep && (
          <TextField
            label="인증번호 입력"
            placeholder="인증번호 입력"
            buttonText="확인하기"
            buttonVisible
          />
        )}
        <TextField label="닉네임" placeholder="닉네임" />
      </div>
      <div className="flex items-center justify-center my-6">
        <ButtonAsset
          text="취소"
          variant="outlined"
          size="lg"
          className="mr-9"
        />
        <ButtonAsset text="회원 가입" variant="filled" size="lg" />
      </div>
    </div>
  );
}
