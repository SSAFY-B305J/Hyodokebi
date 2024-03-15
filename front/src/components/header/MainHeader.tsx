import hyoblin from "../../assets/hyoblin.png";
import club from "../../assets/club.png";

interface MainHeaderProps {
  isLogin: boolean;
}

export default function MainHeader({ isLogin }: MainHeaderProps) {
  return (
    <div>
      {isLogin === false ? (
        <div className="w-full h-[80px] flex flex-row justify-between items-center p-4 border-b-2 bg-white box-border">
          <div className="m-4">
            <img src={hyoblin} alt="" />
          </div>
          <div className="flex gap-5 m-4">
            <div className="text-2xl font-semibold">회원가입</div>
            <div className="text-2xl font-semibold">로그인</div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[80px] flex flex-row justify-between items-center p-4 border-b-2 bg-white">
          <div className="m-4">
            <img src={hyoblin} alt="" />
          </div>
          <div className="flex gap-5 m-4">
            <div>
              <img src={club} alt="" />
            </div>
            <div>
              <img src="" alt="" />
              {/* 프로필 아이콘 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
