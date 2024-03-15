import Input from "../common/Input";
import hyoblin from "../../assets/hyoblin.png";

export default function LoginForm() {
  return (
    <div className="box-border relative flex flex-col align-middle w-[500px] px-[80px] py-[42px] rounded-2xl shadow-lg *:mb-5">
      <div className="mx-auto my-0 mb-8 w-fit">
        <img src={hyoblin} alt="효도깨비" />
      </div>
      <div className="w-[300px] *:mb-3">
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
      <div className="flex flex-col [&>*]:mb-3">
        {/* TODO: 버튼 컴포넌트 만들면 수정하기 */}
        <button>로그인</button>
        <button>카카오 로그인하기</button>
      </div>
      <div className="flex justify-center *:pr-4 last: pr-0">
        {/* TODO: Link로 수정하기 */}
        <a href="!#">아이디 찾기</a>
        <a href="!#">비밀번호 찾기</a>
        <a href="!#">회원가입</a>
      </div>
    </div>
  );
}
