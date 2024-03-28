import KakaoButton from "../../../components/Button/KakaoButton";
import VerticalDivider from "../../../components/user/VerticalDivider";
import FormContainer from "../../../components/user/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../../components/common/TextField";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import { KAKAO_AUTH_URL } from "../../../modules/auth/kakaoAuth";
import { useState } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import { postLogin } from "../../../apis/api/member";
import useLoginStore from "../../../store/useLoginStore";

export default function LoginForm() {
  const { updateIsLogin } = useLoginStore();

  // 아이디, 비밀번호
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 실패 여부
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  function onInputIdHandler(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setId(value);
  }

  function onInputPasswordHandler(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setPassword(value);
  }

  // 로그인
  async function handleClickLoginButton() {
    try {
      await postLogin(id, password);
      updateIsLogin();
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "400") {
          setHasError(true);
        }
      }
    }
  }

  return (
    <FormContainer>
      <>
        <div className="mx-auto mb-10 w-fit">
          <Link to="/">
            <img src="/hyoblin.png" alt="효도깨비" />
          </Link>
        </div>
        {hasError && (
          <div className="flex items-center justify-center px-6 py-5 mb-6 border rounded-md border-secondary bg-secondary/70">
            <WarningIcon color="error" className="mr-4" />
            <span className="text-sm break-keep">
              아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해주세요.
            </span>
          </div>
        )}
        <div className="*:mb-4">
          <TextField
            labelVisible={false}
            placeholder="아이디"
            value={id}
            onInput={onInputIdHandler}
          />
          <TextField
            type="password"
            labelVisible={false}
            placeholder="비밀번호"
            value={password}
            onInput={onInputPasswordHandler}
          />
        </div>
        <div className="flex flex-col my-8 [&>*]:mb-3">
          <ButtonAsset
            text="로그인"
            size="lg"
            onClick={handleClickLoginButton}
          />
          <Link to={KAKAO_AUTH_URL}>
            <KakaoButton text="카카오 로그인하기" size="lg" />
          </Link>
        </div>
        <div className="flex justify-center *:text-sm *:text-gray-700 [&>*:hover]:underline last:pr-0">
          <Link to="/help/idInquiry">아이디 찾기</Link>
          <VerticalDivider />
          <Link to="/help/pwInquiry">비밀번호 찾기</Link>
          <VerticalDivider />
          <Link to="/signup">회원가입</Link>
        </div>
      </>
    </FormContainer>
  );
}
