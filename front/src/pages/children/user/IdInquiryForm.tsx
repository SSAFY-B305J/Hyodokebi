import { Link } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import TextField from "../../../components/common/TextField";
import FormContainer from "../../../components/user/FormContainer";

export default function IdInquiryForm() {
  function handleClick() {
    // TODO: 아이디 찾기 로직 추가
  }

  return (
    <FormContainer>
      <>
        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold">아이디 찾기</h1>
          <h2>가입했을 때 입력하신 이메일을 입력해주세요.</h2>
        </div>
        <div className="mx-auto my-12 w-72">
          <TextField label="이메일" labelVisible placeholder="이메일" />
        </div>
        <div className="flex justify-center my-3">
          <Link to="/login">
            <ButtonAsset text="뒤로가기" variant="outlined" className="mx-3" />
          </Link>
          <Link to="/help/idInquiry/result">
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
