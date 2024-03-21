import TextField from "../common/TextField";
import ButtonAsset from "../Button/ButtonAsset";
import InputAsset from "../common/InputAsset";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function RegForm() {
  const [isEmailAuthStep, setIsEmailAuthStep] = useState<boolean>(false);

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [authCode, setAuthCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const [idError, setIdError] = useState<Error | undefined>(undefined);

  function SubmitHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  // 아이디 input change 핸들러
  function onChangeIdHandler(e: ChangeEvent<HTMLInputElement>): void {
    const idValue = e.target.value;
    setId(idValue);
    idCheckHandler(idValue);
  }

  // 아이디 유효성 체크
  function idCheckHandler(id: string): void {
    const error = new Error();

    // 빈칸인 경우
    if (id === "") {
      error.name = "error";
      error.message = "아이디를 입력해주세요.";
      setIdError(error);
      return;
    }

    // 영어, 숫자 4글자 이상, 13글자 이하 조건에 맞지 않는 경우
    const idRegex = /^[a-z\d]{4,13}$/;
    console.log(idRegex.test(id));

    if (!idRegex.test(id)) {
      error.name = "error";
      error.message = "아이디는 4 ~ 13자의 영소문자, 숫자만 입력 가능합니다.";
      setIdError(error);
      return;
    }

    // 중복된 아이디인 경우
    const response = {}; // 아이디 중복 검사 API 응답값
    if (!response) {
      error.name = "error";
      error.message = "이미 사용 중인 아이디입니다.";
      setIdError(error);
      return;
    }

    error.name = "valid";
    error.message = "사용 가능한 아이디입니다.";
    setIdError(error);
  }

  return (
    <form
      className="flex flex-col items-center w-[500px]"
      onSubmit={SubmitHandler}
    >
      <h1 className="my-6 text-3xl font-bold">회원가입</h1>
      <div className="w-full *:mb-8">
        {/* 아이디 */}
        <TextField
          label="아이디"
          placeholder="아이디"
          value={id}
          onChange={onChangeIdHandler}
          error={idError}
        />
        {/* 비밀번호 */}
        <TextField label="비밀번호" placeholder="비밀번호" value={password} />
        {/* 비밀번호 확인 */}
        <TextField
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          value={passwordCheck}
        />
        {/* 이메일 */}
        <div className="relative w-full">
          <label className="inline-block pb-1 font-bold">이메일</label>
          <div className="flex">
            <InputAsset placeholder="이메일" value={email} />
            <ButtonAsset
              text="인증하기"
              size="sm"
              className="ml-2"
              onClick={() => setIsEmailAuthStep(true)}
            />
          </div>
          <p className="w-full pt-1 text-xs"></p>
        </div>
        {/* 인증번호 입력 - 위의 '인증하기' 버튼을 클릭하면 출력됨 */}
        {isEmailAuthStep && (
          <div className="relative w-full">
            <label className="inline-block pb-1 font-bold">인증번호 입력</label>
            <div className="flex">
              <InputAsset placeholder="인증번호 입력" value={authCode} />
              <ButtonAsset
                text="확인하기"
                size="sm"
                className="ml-2"
                onClick={() => setIsEmailAuthStep(true)}
              />
            </div>
            <p className="w-full pt-1 text-xs"></p>
          </div>
        )}
        {/* 닉네임 */}
        <TextField label="닉네임" placeholder="닉네임" value={nickname} />
      </div>
      {/* Buttons */}
      <div className="flex items-center justify-center my-6">
        <Link to="/signup">
          <ButtonAsset
            text="취소"
            variant="outlined"
            size="lg"
            className="mr-9"
          />
        </Link>
        <ButtonAsset
          type="submit"
          text="회원 가입"
          variant="filled"
          size="lg"
        />
      </div>
    </form>
  );
}
