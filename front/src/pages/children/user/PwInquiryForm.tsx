import { Link, useNavigate } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import TextField from "../../../components/common/TextField";
import FormContainer from "../../../components/user/FormContainer";
import useInquiryStore from "../../../store/useInquiryStore";
import { getDuplicateCheck } from "../../../apis/api/member";

export default function PwInquiryForm() {
  const { id, email, setId, setEmail } = useInquiryStore();
  const navigate = useNavigate();

  async function handleClick() {
    try {
      // 빈칸인 경우
      if (!id) {
        alert("아이디를 입력해주세요.");
        return;
      }

      if (!email) {
        alert("이메일을 입력해주세요.");
        return;
      }

      // 아이디, 이메일이 존재하는지 확인
      // TODO: 아이디 또는 이메일로 회원정보를 알 수 있다면...
      if (
        (await getDuplicateCheck("id", id)) &&
        (await getDuplicateCheck("email", email))
      ) {
        navigate("/help/pwInquiry/reset");
      } else {
        alert("존재하지 않는 아이디 또는 이메일입니다.\n다시 입력해주세요.");
      }
    } catch (error) {
      console.error(error);
    }
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
            value={id}
            onInput={(e) => setId(e.currentTarget.value)}
          />
          <TextField
            label="이메일"
            labelVisible
            placeholder="이메일"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="flex justify-center my-3">
          <Link to="/login">
            <ButtonAsset text="뒤로가기" variant="outlined" className="mx-3" />
          </Link>
          <ButtonAsset text="다음으로" className="mx-3" onClick={handleClick} />
        </div>
      </>
    </FormContainer>
  );
}
