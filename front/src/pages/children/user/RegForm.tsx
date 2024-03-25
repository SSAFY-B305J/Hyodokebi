import TextField from "../../../components/common/TextField";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import InputAsset from "../../../components/common/InputAsset";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegForm() {
  // 아이디, 비밀번호, 비밀번호 확인, 이메일, 이메일 확인, 닉네임
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [pwConfirm, setPwConfirm] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [authCode, setAuthCode] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  // 아이디 에러, 비밀번호 에러, 비밀번호 확인 에러, 이메일 에러, 이메일 확인 에러, 닉네임 에러
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

  const navigate = useNavigate();

  // TODO: 비밀번호 확인을 쓴 후 비밀번호를 치면 비밀번호 확인이 유효한 오류 해결하기

  function SubmitHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const idCheck = idCheckHandler(id);
    const pwCheck = pwCheckHandler(pw);
    const pwConfirmCheck = pwConfirmCheckHandler(pwConfirm);
    const emailCheck = emailCheckHandler(email);
    const nicknameCheck = nicknameCheckHandler(nickname);

    if (idCheck && pwCheck && pwConfirmCheck && emailCheck && nicknameCheck) {
      // 회원가입 성공
      alert("회원가입 성공");
      navigate("/");
    }
  }

  // 아이디 input change 핸들러
  function onChangeIdHandler(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setId(value);
  }

  // 아이디 유효성 검사
  function idCheckHandler(id: string): boolean {
    const error = new Error();

    // 빈칸인 경우
    if (id === "") {
      error.name = "error";
      error.message = "아이디를 입력해주세요.";
      setIdError(error);
      return false;
    }

    // 영어, 숫자 4글자 이상, 13글자 이하 조건에 맞지 않는 경우
    const idRegex = /^[a-z\d]{4,13}$/;
    if (!idRegex.test(id)) {
      error.name = "error";
      error.message = "아이디는 4 ~ 13자의 영소문자, 숫자만 입력 가능합니다.";
      setIdError(error);
      return false;
    }

    // 중복된 아이디인 경우
    const response = {}; // 아이디 중복 검사 API 응답값
    if (!response) {
      error.name = "error";
      error.message = "이미 사용 중인 아이디입니다.";
      setIdError(error);
      return false;
    }

    error.name = "valid";
    error.message = "사용 가능한 아이디입니다.";
    setIdError(error);

    return true;
  }

  // 비밀번호 input change 핸들러
  function onChangePwHandler(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setPw(value);
  }

  // 비밀번호 유효성 검사
  function pwCheckHandler(pw: string): boolean {
    const error = new Error();

    // 빈칸인 경우
    if (pw === "") {
      error.name = "error";
      error.message = "비밀번호를 입력해주세요.";
      setPwError(error);
      return false;
    }

    // 영어, 숫자, 특수문자 6글자 이상, 16글자 이하 조건에 맞지 않는 경우
    const pwRegex = /^[a-zA-Z0-9!@*&-_*]{6,16}$/;
    if (!pwRegex.test(pw)) {
      error.name = "error";
      error.message =
        "비밀번호는 6 ~ 16자의 영문, 숫자, 특수문자(!@*&-_)만 입력 가능합니다.";
      setPwError(error);
      return false;
    }

    error.name = "valid";
    error.message = "";
    setPwError(error);

    return true;
  }

  // 비밀번호 확인 input change 핸들러
  function onChangePwConfirmHandler(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setPwConfirm(value);
    pwConfirmCheckHandler(value);
  }

  // 비밀번호 확인 유효성 검사
  function pwConfirmCheckHandler(pwConfirm: string): boolean {
    const error = new Error();

    // 빈칸인 경우
    if (pwConfirm === "") {
      error.name = "error";
      error.message = "비밀번호를 다시 한 번 입력해주세요.";
      setPwCheckError(error);
      return false;
    }

    // 비밀번호가 다른 경우
    if (pwConfirm !== pw) {
      error.name = "error";
      error.message = "비밀번호가 일치하지 않습니다.";
      setPwCheckError(error);
      return false;
    }

    error.name = "valid";
    error.message = "";
    setPwCheckError(error);

    return true;
  }

  // 이메일 input change 핸들러
  function onChangeEmailHandler(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setEmail(value);
  }

  // 이메일 유효성 검사
  function emailCheckHandler(email: string): boolean {
    const error = new Error();

    // 빈칸인 경우
    if (email === "") {
      error.name = "error";
      error.message = "이메일을 입력해주세요.";
      setEmailError(error);
      setAuthButtonState(false);
      return false;
    }

    // 이메일 형식이 아닌 경우
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]+$/;
    if (!emailRegex.test(email)) {
      error.name = "error";
      error.message = "이메일 형식이 옳바르지 않습니다.";
      setEmailError(error);
      setAuthButtonState(false);
      return false;
    }

    // 이메일 중복 검사
    const response = {}; // 이메일 중복 검사 API 응답값
    if (!response) {
      const error = new Error();
      error.name = "error";
      error.message = "이미 사용 중인 이메일입니다.";
      setEmailError(error);
      return false;
    }

    // 이메일 형식이 맞으면 인증 버튼 활성화
    setAuthButtonState(true);

    // 이메일 인증하지 않은 않은 경우
    if (!isEmailAuthStep) {
      const error = new Error();
      error.name = "error";
      error.message = "이메일을 인증해주세요.";
      setEmailError(error);
      return false;
    }

    error.name = "valid";
    error.message = "";
    setEmailError(error);

    return true;
  }

  // 이메일 인증의 '인증하기' 버튼 click 핸들러
  // 이메일 확인 TextField를 보여줌
  function onClickEmailAuthButton(): void {
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

  // 닉네임 유효성 검사
  function nicknameCheckHandler(nickname: string): boolean {
    const error = new Error();

    // 빈칸인 경우
    if (nickname === "") {
      error.name = "error";
      error.message = "닉네임을 입력해주세요.";
      setNicknameError(error);
      return false;
    }

    // 닉네임 중복 검사
    const response = {}; // 닉네임 중복 검사 API 응답값
    if (!response) {
      const error = new Error();
      error.name = "error";
      error.message = "이미 사용 중인 닉네임입니다.";
      setNicknameError(error);
      return false;
    }

    error.name = "valid";
    error.message = "";
    setNicknameError(error);

    return true;
  }

  return (
    <div className="m-14">
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
            autoComplete="off"
          />
          {/* 비밀번호 확인 */}
          <TextField
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            value={pwConfirm}
            onChange={onChangePwConfirmHandler}
            // onBlur={(e) => pwCheckCheckHandler(e)}
            error={pwCheckError}
            autoComplete="off"
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
                type="button"
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
              <label className="inline-block pb-1 font-bold">
                인증번호 입력
              </label>
              <div className="flex">
                <InputAsset
                  placeholder="인증번호 입력"
                  value={authCode}
                  onChange={onChangeAuthCodeHandler}
                />
                <ButtonAsset
                  type="button"
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
    </div>
  );
}
