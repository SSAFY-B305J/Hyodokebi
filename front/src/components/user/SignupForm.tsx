import FormContainer from "./FormContainer";
import hyoblin from "../../assets/hyoblin.png";
import KakaoButton from "../Button/KakaoButton";
import HorizontalDivider from "./HorizontalDivider";
import { Link } from "react-router-dom";
import ButtonAsset from "../Button/ButtonAsset";

export default function SignupForm() {
  return (
    <FormContainer>
      <>
        <div className="mx-auto w-fit">
          <Link to="/">
            <img src={hyoblin} alt="효도깨비" />
          </Link>
        </div>
        <div className="flex flex-col my-20 [&>*]:mb-3">
          <div className="flex flex-col">
            <ButtonAsset text="회원가입하기" size="lg" />
            <HorizontalDivider text="또는" />
            <KakaoButton text="카카오로 시작하기" size="lg" />
          </div>
        </div>
      </>
    </FormContainer>
  );
}
