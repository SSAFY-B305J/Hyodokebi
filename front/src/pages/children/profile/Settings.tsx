import ProfileMenuButton from "../../../components/Button/ProfileMenuButton";

export default function Settings() {
  return (
    <div className="w-[600px] h-[500px]">
      <h1 className="text-2xl font-bold text-center">설정</h1>
      <div className="w-full p-4 my-5">
        <ProfileMenuButton to="/help/pwInquiry/confirm" text="비밀번호 변경" />
        <ProfileMenuButton to="/help/unregister" text="회원 탈퇴" />
      </div>
    </div>
  );
}
