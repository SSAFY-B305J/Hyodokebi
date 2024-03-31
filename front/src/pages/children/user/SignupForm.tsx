import FormContainer from "../../../components/user/FormContainer";
import KakaoButton from "../../../components/Button/KakaoButton";
import HorizontalDivider from "../../../components/user/HorizontalDivider";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();

  return (
    <FormContainer>
      <>
        <div className="mx-auto w-fit">
          <Link to="/">
            <img src="/hyoblin.png" alt="효도깨비" />
          </Link>
        </div>
        <div className="flex flex-col my-20 [&>*]:mb-3">
          <div className="flex flex-col">
            <ButtonAsset
              text="회원가입하기"
              size="lg"
              onClick={() => navigate("regform")}
            />
            <HorizontalDivider text="또는" />
            <KakaoButton text="카카오로 시작하기" size="lg" />
          </div>
        </div>
      </>
    </FormContainer>
  );
}
