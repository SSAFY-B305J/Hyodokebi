import { Link } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import FormContainer from "../../../components/user/FormContainer";

export default function IdInquiryResult() {
  // TODO: 아이디 찾기 결과 API 연동 후 출력

  return (
    <FormContainer>
      <>
        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold">아이디 찾기 결과</h1>
          <h2>해당 이메일로 가입된 계정은 다음과 같습니다.</h2>
        </div>
        <div className="mx-auto my-12 text-center w-72">
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
          <Link to="/help/pwInquiry">
            <ButtonAsset text="비밀번호 찾기" className="mx-3" />
          </Link>
        </div>
      </>
    </FormContainer>
  );
}
