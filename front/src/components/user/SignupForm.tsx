import FormContainer from "./FormContainer";
import hyoblin from "../../assets/hyoblin.png";
import Button from "../Button/Button";
import KakaoButton from "../Button/KakaoButton";
import HorizontalDivider from "./HorizontalDivider";
import { Link } from "react-router-dom";

export default function SignupForm() {
  return (
    <FormContainer>
      <>
        <div className="mx-auto w-fit">
          <Link to="/">
            <img src={hyoblin} alt="효도깨비" />
          </Link>
        </div>
        <div className="flex flex-col my-24 [&>*]:mb-3">
          <div className="flex flex-col">
            <Button text="로그인" size="lg" />
            <HorizontalDivider text="또는" />
            <KakaoButton text="카카오 로그인하기" size="lg" />
          </div>
        </div>
      </>
    </FormContainer>
  );
}
