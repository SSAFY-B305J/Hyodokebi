import ButtonAsset from "../../../components/Button/ButtonAsset";
import FormContainer from "../../../components/user/FormContainer";
import TextField from "../../../components/common/TextField";

export default function PwInquiryResetResult() {
  // TODO: 새로운 비밀번호 수정
  function handleClick() {
    // API 연동
    // 완료 alert 창 띄우기
    // 로그인 화면으로 이동
  }

  return (
    <FormContainer>
      <>
        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold">비밀번호 재설정</h1>
          <h2>새로 사용할 비밀번호를 입력해 주세요.</h2>
        </div>
        <div className="mx-auto my-12 w-72">
          <TextField
            label="새 비밀번호"
            labelVisible
            placeholder="새 비밀번호"
            className="mb-5"
          />
          <TextField
            label="새 비밀번호 확인"
            labelVisible
            placeholder="새 비밀번호 확인"
          />
        </div>
        <div className="flex justify-center my-3">
          <ButtonAsset text="확인" className="mx-3" onClick={handleClick} />
        </div>
      </>
    </FormContainer>
  );
}
