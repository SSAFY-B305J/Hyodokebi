import { useState } from "react";
import TextField from "../../../components/common/TextField";
import FormContainer from "../../../components/user/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import useLoginStore from "../../../store/useLoginStore";

export default function UnRegForm() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { logout } = useLoginStore();

  // 다음 버튼 클릭 핸들러
  // 존재하는 이메일인지 확인하고 있다면 다음 페이지로 이동
  async function handleClickNextButton() {
    // 입력값이 없을 경우
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    // 맞는 비밀번호인지 확인
    // TODO: 현재 로그인한 회원 정보로 얻을 수 있지 않을까?
    // 존재한다면 결과 페이지로 이동
    if (true) {
      const result = window.confirm(
        "정말 탈퇴하시겠습니까?\n회원 탈퇴 후엔 지금까지 저장하신 모든 기록들이 사라집니다."
      );

      if (result) {
        // TODO: 회원탈퇴 API 추가
        alert("회원 탈퇴가 되었습니다.\n효도깨비를 이용해주셔서 감사합니다.");
        logout();
        navigate("/");
      }
    } else {
      alert("틀린 비밀번호입니다. 다시 입력해주세요.");
      setPassword("");
    }
  }

  return (
    <FormContainer>
      <>
        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold">회원 탈퇴</h1>
          <h2>정말 탈퇴하시겠습니까?</h2>
          <h2>원하신다면 비밀번호를 입력해주세요.</h2>
        </div>
        <div className="mx-auto my-12 w-72">
          <TextField
            type="password"
            label="비밀번호"
            labelVisible
            placeholder="비밀번호"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="flex justify-center my-3">
          <Link to={"/settings"}>
            <ButtonAsset text="뒤로가기" variant="outlined" className="mx-3" />
          </Link>
          <ButtonAsset
            text="다음으로"
            className="mx-3"
            onClick={handleClickNextButton}
          />
        </div>
      </>
    </FormContainer>
  );
}
