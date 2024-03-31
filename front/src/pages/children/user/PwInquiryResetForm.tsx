import ButtonAsset from "../../../components/Button/ButtonAsset";
import FormContainer from "../../../components/user/FormContainer";
import TextField from "../../../components/common/TextField";
import useRegistStore from "../../../store/useRegistStore";
import useLoginStore from "../../../store/useLoginStore";
import { useNavigate } from "react-router-dom";

export default function PwInquiryResetResult() {
  const regStore = useRegistStore();
  const { logout } = useLoginStore();
  const navigate = useNavigate();

  // TODO: 새로운 비밀번호 수정
  function handleClick() {
    const passwordCheck = regStore.checkPassword();
    const passwordConfirmCheck = regStore.checkPasswordConfirm();

    // 입력 폼이 유효하면 비밀번호를 재설정한다.
    if (passwordCheck && passwordConfirmCheck) {
      try {
        // TODO: 비밀번호 수정 API 추가
        alert("비밀번호가 재설정되었습니다. 다시 로그인해주세요.");
        logout();
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <FormContainer>
      <>
        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold">비밀번호 재설정</h1>
          <h2>새로 사용할 비밀번호를 입력해 주세요.</h2>
        </div>
        <div className="mx-auto my-12 w-72">
          <div className="mb-5">
            <TextField
              type="password"
              label="새 비밀번호"
              labelVisible
              placeholder="새 비밀번호"
              value={regStore.password}
              onInput={(e) => regStore.setPassword(e.currentTarget.value)}
              onChange={regStore.checkPassword}
              error={regStore.passwordError}
            />
          </div>
          <TextField
            type="password"
            label="새 비밀번호 확인"
            labelVisible
            placeholder="새 비밀번호 확인"
            value={regStore.passwordConfirm}
            onInput={(e) => regStore.setPasswordConfirm(e.currentTarget.value)}
            onChange={regStore.checkPasswordConfirm}
            error={regStore.passwordConfirmError}
          />
        </div>
        <div className="flex justify-center my-3">
          <ButtonAsset text="확인" className="mx-3" onClick={handleClick} />
        </div>
      </>
    </FormContainer>
  );
}
