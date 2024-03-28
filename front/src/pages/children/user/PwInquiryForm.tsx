import { Link } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import TextField from "../../../components/common/TextField";
import FormContainer from "../../../components/user/FormContainer";

export default function PwInquiryForm() {
  function handleClick() {
    // TODO: 입력값 저장
  }

  return (
    <FormContainer>
      <>
        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold">비밀번호 찾기</h1>
          <h2 className="break-keep">
            비밀번호를 찾고자하는 아이디와 이메일을 입력 해주세요.
          </h2>
        </div>
        <div className="mx-auto my-12 w-72">
          <TextField
            label="아이디"
            labelVisible
            placeholder="아이디"
            className="mb-5"
          />
          <TextField label="이메일" labelVisible placeholder="이메일" />
        </div>
        <div className="flex justify-center my-3">
          <Link to="/login">
            <ButtonAsset text="뒤로가기" variant="outlined" className="mx-3" />
          </Link>
          <Link to="/help/pwInquiry/result">
            <ButtonAsset
              text="다음으로"
              className="mx-3"
              onClick={handleClick}
            />
          </Link>
        </div>
      </>
    </FormContainer>
  );
}
