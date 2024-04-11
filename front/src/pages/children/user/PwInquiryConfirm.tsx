import { useState } from "react";
import TextField from "../../../components/common/TextField";
import FormContainer from "../../../components/user/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import { getCheckPassword } from "../../../apis/api/member";

export default function PwInquiryConfirm() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 다음 버튼 클릭 핸들러
  // 존재하는 이메일인지 확인하고 있다면 다음 페이지로 이동
  async function handleClickNextButton() {
    // 입력값이 없을 경우
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    // TODO: 맞는 비밀번호인지 확인 - API 완성 후 수정 필요
    // 존재한다면 결과 페이지로 이동
    // const result = await getCheckPassword(password);
    const result = true;
    if (result) {
      navigate("/help/pwInquiry/reset");
    } else {
      alert("비밀번호가 틀렸습니다. 다시 입력해주세요.");
      setPassword("");
    }
  }

  return (
    <FormContainer>
      <>
        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold">비밀번호 수정</h1>
          <h2>현재 사용하고 계신 비밀번호를 입력해주세요.</h2>
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
