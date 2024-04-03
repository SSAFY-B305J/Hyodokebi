import { Edit, Settings } from "@mui/icons-material";
import ProfileMenuButton from "../../../components/Button/ProfileMenuButton";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../../../store/useLoginStore";
import { useEffect } from "react";

export default function ProfileDetail() {
  const navigate = useNavigate();
  const { getIsLogin, loginMember } = useLoginStore();

  useEffect(() => {
    if (!getIsLogin() || !loginMember) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [getIsLogin, loginMember, navigate]);

  return (
    <div className="w-[600px]">
      <div className="flex w-full p-4 my-10 border rounded-md">
        <img
          src={require(`../../../assets/profiles/profile${loginMember?.memberProfile}.jpg`)}
          alt="프로필 이미지"
          className="w-[192px] h-[192px]"
        />
        <div className="flex flex-col justify-center max-w-[250px] ml-12">
          <div className="mb-5">
            <p className="text-3xl font-semibold">
              {loginMember?.memberNickname}
            </p>
          </div>
          <p className="flex w-full mb-2">{loginMember?.memberEmail}</p>
        </div>
      </div>
      <ProfileMenuButton
        to="edit"
        text="회원 정보 수정"
        iconElement={<Edit fontSize="small" />}
      />
      <ProfileMenuButton
        to="/settings"
        text="설정"
        iconElement={<Settings fontSize="small" />}
      />
    </div>
  );
}
