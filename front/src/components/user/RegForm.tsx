import TextField from "../common/TextField";
import ButtonAsset from "../Button/ButtonAsset";
import InputAsset from "../common/InputAsset";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function RegForm() {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");
  const [authCode, setAuthCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const [idError, setIdError] = useState<Error | undefined>(undefined);
  const [pwError, setPwError] = useState<Error | undefined>(undefined);
  const [pwCheckError, setPwCheckError] = useState<Error | undefined>(
    undefined
  );
  const [emailError, setEmailError] = useState<Error | undefined>(undefined);
  const [nicknameError, setNicknameError] = useState<Error | undefined>(
    undefined
  );

  const [AuthButtonState, setAuthButtonState] = useState<boolean>(false);
  const [isEmailAuthStep, setIsEmailAuthVisible] = useState<boolean>(false);

  function SubmitHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    idCheckHandler(id);
    pwCheckHandler(pw);
    pwCheckCheckHandler(pwCheck);
    emailCheckHandler(email);
    nicknameCheckHandler(nickname);

    // 이메일 인증하지 않은 않은 경우
    if (!isEmailAuthStep) {
      const error = new Error();
      error.name = "error";
      error.message = "이메일 인증을 진행해주세요.";
      setEmailError(error);
    }
  }

  // 아이디 input change 핸들러
  function onChangeIdHandler(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setId(value);
  }

  // 아이디 유효성 검사
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

  // 비밀번호 input change 핸들러
  function onChangePwHandler(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setPw(value);
  }

  // 비밀번호 유효성 검사
  function pwCheckHandler(pw: string): void {
    const error = new Error();

    // 빈칸인 경우
    if (pw === "") {
      error.name = "error";
      error.message = "비밀번호를 입력해주세요.";
      setPwError(error);
      return;
    }

    // 영어, 숫자, 특수문자 6글자 이상, 16글자 이하 조건에 맞지 않는 경우
    const pwRegex = /^[a-zA-Z0-9!@*&-_*]{6,16}$/;
    if (!pwRegex.test(pw)) {
      error.name = "error";
      error.message =
        "비밀번호는 6 ~ 16자의 영문, 숫자, 특수문자(!@*&-_)만 입력 가능합니다.";
      setPwError(error);
      return;
    }

    error.name = "valid";
    error.message = "";
    setPwError(error);
  }

  // 비밀번호 확인 input change 핸들러
  function onChangePwCheckHandler(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setPwCheck(value);
  }

  // 비밀번호 확인 유효성 검사
  function pwCheckCheckHandler(pwCheck: string): void {
    const error = new Error();

    // 빈칸인 경우
    if (pwCheck === "") {
      console.log(pwCheck);

      error.name = "error";
      error.message = "비밀번호를 다시 한 번 입력해주세요.";
      setPwCheckError(error);
      return;
    }

    // 비밀번호가 다른 경우
    if (pw !== pwCheck) {
      error.name = "error";
      error.message = "비밀번호가 일치하지 않습니다.";
      setPwCheckError(error);
      return;
    }

    error.name = "valid";
    error.message = "";
    setPwError(error);
  }

  // 이메일 input change 핸들러
  function onChangeEmailHandler(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setEmail(value);
  }

  // 이메일 유효성 검사
  function emailCheckHandler(email: string): void {
    const error = new Error();

    // 빈칸인 경우
    if (email === "") {
      error.name = "error";
      error.message = "이메일을 입력해주세요.";
      setEmailError(error);
      setAuthButtonState(false);
      return;
    }

    // 이메일 형식이 아닌 경우
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]+$/;
    if (!emailRegex.test(email)) {
      error.name = "error";
      error.message = "이메일 형식이 옳바르지 않습니다.";
      setEmailError(error);
      setAuthButtonState(false);
      return;
    }

    // 이메일 형식이 맞으면 인증 버튼 활성화
    setAuthButtonState(true);

    error.name = "valid";
    error.message = "";
    setEmailError(error);
  }

  // 이메일 인증의 '인증하기' 버튼 click 핸들러
  // 이메일 확인 TextField를 보여줌
  function onClickEmailAuthButton() {
    setIsEmailAuthVisible(true);
    setAuthButtonState(false);
  }

  // 이메일 확인 input change 핸들러
  function onChangeAuthCodeHandler(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setAuthCode(value);
  }

  // 닉네임 input change 핸들러
  function onChangeNicknameHandler(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setNickname(value);
    nicknameCheckHandler(value);
  }

  function nicknameCheckHandler(nickname: string): void {
    const error = new Error();

    // 빈칸인 경우
    if (nickname === "") {
      error.name = "error";
      error.message = "닉네임을 입력해주세요.";
      setNicknameError(error);
      return;
    }

    error.name = "valid";
    error.message = "";
    setNicknameError(error);
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
          onBlur={() => idCheckHandler(id)}
          error={idError}
        />
        {/* 비밀번호 */}
        <TextField
          type="password"
          label="비밀번호"
          placeholder="비밀번호"
          value={pw}
          onChange={onChangePwHandler}
          onBlur={() => pwCheckHandler(pw)}
          error={pwError}
        />
        {/* 비밀번호 확인 */}
        <TextField
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          value={pwCheck}
          onChange={onChangePwCheckHandler}
          onBlur={() => pwCheckCheckHandler(pwCheck)}
          error={pwCheckError}
        />
        {/* 이메일 */}
        <div className="relative w-full">
          <label className="inline-block pb-1 font-bold">이메일</label>
          <div className="flex">
            <InputAsset
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onChangeEmailHandler}
              onBlur={() => emailCheckHandler(email)}
            />
            <ButtonAsset
              text="인증하기"
              size="sm"
              className="ml-2"
              disabled={!AuthButtonState}
              onClick={onClickEmailAuthButton}
            />
          </div>
          <p className="w-full pt-1 text-xs">
            {emailError && emailError.message}
          </p>
        </div>
        {/* 인증번호 입력 - 위의 '인증하기' 버튼을 클릭하면 출력됨 */}
        {isEmailAuthStep && (
          <div className="relative w-full">
            <label className="inline-block pb-1 font-bold">인증번호 입력</label>
            <div className="flex">
              <InputAsset
                placeholder="인증번호 입력"
                value={authCode}
                onChange={onChangeAuthCodeHandler}
              />
              <ButtonAsset
                text="확인하기"
                size="sm"
                className="ml-2"
                onClick={() => setIsEmailAuthVisible(true)}
              />
            </div>
            <p className="w-full pt-1 text-xs"></p>
          </div>
        )}
        {/* 닉네임 */}
        <TextField
          label="닉네임"
          placeholder="닉네임"
          value={nickname}
          error={nicknameError}
          onChange={onChangeNicknameHandler}
          onBlur={() => nicknameCheckHandler(nickname)}
        />
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
