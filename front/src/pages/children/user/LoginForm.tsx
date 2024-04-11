import KakaoButton from "../../../components/Button/KakaoButton";
import VerticalDivider from "../../../components/user/VerticalDivider";
import FormContainer from "../../../components/user/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextField from "../../../components/common/TextField";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import { KAKAO_AUTH_URL } from "../../../modules/auth/kakaoAuth";
import { FormEvent, useEffect, useState } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import { getMemberInfo, postLogin } from "../../../apis/api/member";
import useLoginStore from "../../../store/useLoginStore";
import logo from "../../../assets/logo.png";

export default function LoginForm() {
  const { setLoginMember, setLoginMemberIdx, getIsLogin } = useLoginStore();

  // 아이디, 비밀번호
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 실패 여부
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  // 로그인
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      // 로그인 - 로그인 회원 인덱스 저장
      await postLogin(id, password);

      // 로그인한 회원 인덱스, 정보 저장
      const data = await getMemberInfo();
      setLoginMemberIdx(data?.idx);
      setLoginMember(data?.info);

      // 로그인하기 이전 페이지로 이동
      if (state) navigate(state);
      else navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "400") {
          setHasError(true);
        } else if (error.name === "Unauthorized") {
          alert(error.message);
          navigate("/");
        }
      }
    }
  }

  useEffect(() => {
    // 로그인한 유저는 메인페이지로 튕김
    if (getIsLogin()) navigate("/");
  }, [getIsLogin, navigate]);

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto mb-10 w-fit">
          <Link to="/">
            <img src={logo} alt="효도깨비" className="w-60" />
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
            onInput={(e) => setId(e.currentTarget.value)}
          />
          <TextField
            type="password"
            labelVisible={false}
            placeholder="비밀번호"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col my-8 [&>*]:mb-3">
          <ButtonAsset type="submit" text="로그인" size="lg" />
          <Link to={KAKAO_AUTH_URL}>
            <KakaoButton type="button" text="카카오 로그인하기" size="lg" />
          </Link>
        </div>
        <div className="flex justify-center *:text-sm *:text-gray-700 [&>*:hover]:underline last:pr-0">
          <Link to="/help/idInquiry">아이디 찾기</Link>
          <VerticalDivider />
          <Link to="/help/pwInquiry">비밀번호 찾기</Link>
          <VerticalDivider />
          <Link to="/signup">회원가입</Link>
        </div>
      </form>
    </FormContainer>
  );
}
