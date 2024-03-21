import hyoblin from "../../assets/hyoblin.png";
import KakaoButton from "../Button/KakaoButton";
import VerticalDivider from "./VerticalDivider";
import FormContainer from "./FormContainer";
import { Link } from "react-router-dom";
import TextField from "../common/TextField";
import ButtonAsset from "../Button/ButtonAsset";

export default function LoginForm() {
  return (
    <FormContainer>
      <>
        <div className="mx-auto mb-10 w-fit">
          <Link to="/">
            <img src={hyoblin} alt="효도깨비" />
          </Link>
        </div>
        <div className="*:mb-4">
          <TextField labelVisible={false} placeholder="아이디" />
          <TextField labelVisible={false} placeholder="비밀번호" />
        </div>
        <div className="flex flex-col my-8 [&>*]:mb-3">
          <ButtonAsset text="로그인" size="lg" />
          <KakaoButton text="카카오 로그인하기" size="lg" />
        </div>
        <div className="flex justify-center *:text-sm *:text-gray-700 [&>*:hover]:underline last:pr-0">
          <Link to="/">아이디 찾기</Link>
          <VerticalDivider />
          <Link to="/">비밀번호 찾기</Link>
          <VerticalDivider />
          <Link to="/signup">회원가입</Link>
        </div>
      </>
    </FormContainer>
  );
}
