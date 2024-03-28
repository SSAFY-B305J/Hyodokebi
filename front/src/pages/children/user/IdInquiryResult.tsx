import { Link } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import TextField from "../../../components/common/TextField";
import FormContainer from "../../../components/user/FormContainer";

export default function IdInquiryResult() {
  function handleClick() {
    // TODO: 아이디 찾기 로직 추가
  }

  return (
    <FormContainer>
      <>
        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold">아이디 찾기 결과</h1>
          <h2>해당 이메일로 가입된 계정은 다음과 같습니다.</h2>
        </div>
        <div className="mx-auto text-center my-14 w-72">
          <p className="font-bold">결과 아이디 출력</p>
        </div>
        <div className="flex justify-center my-3">
          <Link to="/login">
            <ButtonAsset
              text="로그인하기"
              variant="outlined"
              className="mx-3"
            />
          </Link>
          <Link to="/help/idInquiry/result">
            <ButtonAsset
              text="비밀번호 찾기"
              className="mx-3"
              onClick={handleClick}
            />
          </Link>
        </div>
      </>
    </FormContainer>
  );
}
