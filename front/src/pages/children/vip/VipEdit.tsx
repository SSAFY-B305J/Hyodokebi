import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MenuCard from "../../../components/card/MenuCard";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "../../../components/common/TextField";
import { getVip, putVip } from "../../../apis/api/vip";

interface PutVipData {
  vipAgeGroups: null;
  vipBirth: number;
  vipId: number;
  vipNickname: string;
  vipProfile: number;
}

export default function VipEdit() {
  const { id, vipId } = useParams();
  const navigate = useNavigate();

  const [birth, setBirth] = useState(0);
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState(0);

  const vipIndex = vipId ? parseInt(vipId) : NaN;

  const handleClick = async () => {
    if (birth !== 0 && nickname !== "" && profile !== 9) {
      // ALERT 빈 값으로 두면 안되는 조건 추가, 조건 추가시 확인.
      try {
        await putVip(vipIndex, {
          vipBirth: birth,
          vipNickname: nickname,
          vipProfile: profile,
        });
        console.log("VIP 수정");

        navigate(`/mypage/${id}/vip/${vipId}`);
      } catch (error) {
        console.error("Error updating VIP:", error);
      }
    } else {
      if (birth === 0) {
        alert("태어나신 해를 입력해주세요.");
      } else if (nickname === "") {
        alert("닉네임을 입력해주세요.");
      } else {
        alert("프로필 사진을 선택하세요");
      }
    }
  };

  const initVip = useCallback(async () => {
    const data: PutVipData = await getVip(Number(vipId));
    setNickname(data.vipNickname);
    setBirth(data.vipBirth);
    setProfile(data.vipProfile);
  }, [vipId]);

  useEffect(() => {
    initVip();
  }, [initVip]);

  const arr = Array.from({ length: 8 }, (v, i) => i);

  return (
    <div className="w-[600px]">
      <div className="flex flex-col w-full p-4 my-10">
        <div className="flex items-center my-3">
          <Link to={`/mypage/${id}/vip/${vipId}`} className="pr-3">
            <ArrowBackIcon fontSize="large" />
          </Link>
          <h1 className="text-3xl font-bold">VIP 수정</h1>
        </div>
        <div className="w-full py-8 border-b">
          <div className="w-[400px]">
            <TextField
              id="nickname"
              label="닉네임"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
          </div>
        </div>
        <div className="w-full py-8 border-b">
          <div className="w-[400px]">
            <TextField
              id="birth"
              label="태어나신 해"
              value={birth}
              onChange={(event) => setBirth(parseInt(event.target.value))}
            />
          </div>
        </div>
        <div className="w-full py-8 border-b">
          <h2 className="mb-3 text-lg font-bold">프로필 사진</h2>
          <div className="flex w-full">
            <img
              src={require(`../../../assets/profiles/profile${profile}.jpg`)}
              alt="empty"
              className="mr-3 w-36 h-36"
            />

            <div className="flex flex-wrap justify-between content-between w-[300px] h-36">
              {arr.map((x) => (
                <img
                  key={x}
                  src={require(`../../../assets/profiles/profile${x}.jpg`)}
                  alt="empty"
                  className={`w-16 h-16 ${
                    profile === x && "border-[3px] border-primary"
                  }`}
                  onClick={() => setProfile(x)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* TODO: 선호음식 선택*/}
        <div className="w-full py-8 ">
          <h2 className="mb-3 text-lg font-bold">선호 음식 선택</h2>
          <div className="flex w-full p-2 overflow-auto">
            <div className="grid w-full h-full grid-cols-5 gap-3">
              <MenuCard cate_image={1} menu_id={1} menu_name="1" />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full my-5">
          <ButtonAsset
            text="취소"
            variant="outlined"
            className="w-24 mr-8"
            onClick={() => navigate(`/mypage/${id}/vip/${vipId}`)}
          />
          <ButtonAsset text="저장" className="w-24" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
