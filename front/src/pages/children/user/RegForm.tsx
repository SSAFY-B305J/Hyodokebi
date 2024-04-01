import { useNavigate } from "react-router-dom";
import { postRegist } from "../../../apis/api/member";
import TextField from "../../../components/common/TextField";
import useRegistStore from "../../../store/useRegistStore";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import { FormEvent, KeyboardEvent, useEffect } from "react";

export default function RegForm2() {
  const navigate = useNavigate();
  const { ...regStore } = useRegistStore();

  // form submit 이벤트 핸들러
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // 모든 input 유효성 검사하기
    const isValid = await regStore.getRegistValid();

    // 모든 input 검사 통과하면 회원가입 요청
    // TODO: 로그인 에러 확인하기
    if (isValid) {
      // 회원가입 성공
      postRegist(
        regStore.id,
        regStore.password,
        regStore.email,
        regStore.nickname,
        "1"
      )
        .then(() => {
          alert("회원가입 성공!");
          navigate("/login");
        })
        .catch((error) => {
          console.error("RegForm Error:", error);
          alert("회원가입 실패");
        });
    }
  }

  // 취소 버튼 클릭 이벤트 핸들러
  // 페이지 이탈 전에 confirm 창 띄우기
  function handleCancelButton() {
    const confirm = window.confirm(
      "이 페이지에서 나가시겠습니까?\n지금까지 작성된 글은 저장되지 않습니다."
    );
    if (confirm) navigate("/signup");
  }

  // Form key down 이벤트 핸들러
  // Form에서 Enter 키 누를 때 Submit 방지
  function handleKeyDownEnter(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  useEffect(() => {
    return () => regStore.clear();
  }, []);

  return (
    <div className="m-14">
      <form
        className="flex flex-col items-center w-[500px]"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDownEnter}
      >
        <h1 className="my-6 text-3xl font-bold">회원가입</h1>
        <div className="w-full *:mb-8">
          {/* 아이디 */}
          <TextField
            label="아이디"
            placeholder="아이디"
            value={regStore.id}
            onInput={(e) => regStore.setId(e.currentTarget.value)}
            onBlur={regStore.checkId}
            error={regStore.idError}
          />
          {/* 비밀번호 */}
          <TextField
            type="password"
            label="비밀번호"
            placeholder="비밀번호"
            value={regStore.password}
            onInput={(e) => regStore.setPassword(e.currentTarget.value)}
            onChange={regStore.checkPassword}
            error={regStore.passwordError}
            autoComplete="off"
          />
          {/* 비밀번호 확인 */}
          <TextField
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            value={regStore.passwordConfirm}
            onInput={(e) => regStore.setPasswordConfirm(e.currentTarget.value)}
            onChange={regStore.checkPasswordConfirm}
            error={regStore.passwordConfirmError}
            autoComplete="off"
          />

          {/* 이메일 */}
          <TextField
            type="email"
            label="이메일"
            placeholder="이메일"
            value={regStore.email}
            onInput={(e) => regStore.setEmail(e.currentTarget.value)}
            onBlur={regStore.checkEmail}
            error={regStore.emailError}
          />
          {/* 닉네임 */}
          <TextField
            label="닉네임"
            placeholder="닉네임"
            value={regStore.nickname}
            onInput={(e) => regStore.setNickname(e.currentTarget.value)}
            onBlur={regStore.checkNickname}
            error={regStore.nicknameError}
          />
        </div>
        {/* Buttons */}
        <div className="flex items-center justify-center my-6">
          <ButtonAsset
            text="취소"
            variant="outlined"
            size="lg"
            className="mr-9"
            onClick={handleCancelButton}
          />
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
