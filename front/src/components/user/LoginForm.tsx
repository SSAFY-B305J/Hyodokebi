import Input from "../common/Input";
import hyoblin from "../../assets/hyoblin.png";
import Button from "../Button/Button";
import KakaoButton from "../Button/KakaoButton";
import VerticalDivider from "./VerticalDivider";
import FormContainer from "./FormContainer";

export default function LoginForm() {
  return (
    <FormContainer>
      <>
        <div className="mx-auto mb-10 w-fit">
          {/* TODO: 메인페이지로 Link 연결 */}
          <a href="!#">
            <img src={hyoblin} alt="효도깨비" />
          </a>
        </div>
        <div className="mb-6 *:mb-3">
          <Input
            id="loginId"
            label="아이디"
            labelVisible={false}
            placeholder="아이디"
          />
          <Input
            id="loginPassword"
            label="비밀번호"
            labelVisible={false}
            placeholder="비밀번호"
          />
        </div>
        <div className="flex flex-col mb-6 [&>*]:mb-3">
          <Button text="로그인" size="lg" />
          <KakaoButton text="카카오 로그인하기" size="lg" />
        </div>
        <div className="flex justify-center *:text-sm *:text-gray-700 [&>*:hover]:underline last:pr-0">
          {/* TODO: Link로 수정하기 */}
          <a href="!#">아이디 찾기</a>
          <VerticalDivider />
          <a href="!#">비밀번호 찾기</a>
          <VerticalDivider />
          <a href="!#">회원가입</a>
        </div>
      </>
    </FormContainer>
  );
}
