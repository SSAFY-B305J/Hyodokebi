import { Link, useNavigate } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import TextField from "../../../components/common/TextField";
import FormContainer from "../../../components/user/FormContainer";
import useInquiryStore from "../../../store/useInquiryStore";
import { getDuplicateCheck } from "../../../apis/api/member";

export default function IdInquiryForm() {
  const { email, setEmail } = useInquiryStore();
  const navigate = useNavigate();

  // 다음 버튼 클릭 핸들러
  // 존재하는 이메일인지 확인하고 있다면 다음 페이지로 이동
  async function handleClickNextButton() {
    // 입력값이 없을 경우
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    // 존재하는 이메일인지 확인
    // 존재한다면 결과 페이지로 이동
    if (await getDuplicateCheck("email", email)) {
      navigate("/help/idInquiry/result");
    } else {
      alert("존재하지 않는 이메일입니다. 다시 입력해주세요.");
      setEmail("");
    }
  }

  return (
    <FormContainer>
      <>
        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold">아이디 찾기</h1>
          <h2>가입했을 때 입력하신 이메일을 입력해주세요.</h2>
        </div>
        <div className="mx-auto my-12 w-72">
          <TextField
            label="이메일"
            labelVisible
            placeholder="이메일"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="flex justify-center my-3">
          <Link to={"/login"}>
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
