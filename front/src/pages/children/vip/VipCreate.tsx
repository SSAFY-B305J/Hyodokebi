import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { postVip } from "../../../apis/api/vip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import TextField from "../../../components/common/TextField";

export default function VipCreate() {
  const navigate = useNavigate();
  const [vipData, setVipData] = useState({
    vipBirth: 0,
    vipNickname: "",
    vipProfile: 9,
  });

  const [birth, setBirth] = useState("");
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState(0);

  const { id } = useParams();

  const arr = Array.from({ length: 8 }, (v, i) => i);

  const handleClick = () => {
    if (Number(birth) !== 0 && nickname !== "" && profile !== 9) {
      // ALERT 빈 값으로 두면 안되는 조건 추가, 조건 추가시 확인.
      try {
        localStorage.setItem("vipData", JSON.stringify(vipData));
        console.log(vipData);
        console.log(vipData.vipNickname, vipData.vipBirth, vipData.vipProfile);
        postVip(vipData.vipNickname, vipData.vipBirth, vipData.vipProfile);
        navigate(`/mypage/${id}/vip/chooseFood`);
      } catch (error) {
        console.error("Error creating VIP:", error);
      }
    } else {
      if (Number(birth) === 0) {
        alert("태어나신 해를 입력해주세요.");
      } else if (nickname === "") {
        alert("닉네임을 입력해주세요.");
      } else {
        alert("프로필 사진을 선택하세요");
      }
    }
  };

  useEffect(() => {
    setVipData((vipData) => ({
      ...vipData,
      vipBirth: Number(birth),
      vipNickname: nickname,
      vipProfile: profile,
    }));
  }, [birth, nickname, profile]);

  return (
    <div className="w-[600px]">
      <div className="flex flex-col w-full p-4 my-10">
        <div className="flex items-center my-3">
          <Link
            to={`/mypage/${id}/vip`}
            className="pr-3"
          >
            <ArrowBackIcon fontSize="large" />
          </Link>
          <h1 className="text-3xl font-bold">VIP 추가</h1>
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
              onChange={(event) => setBirth(event.target.value)}
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
                    profile === x && "border-[3px] border-primary rounded-full"
                  }`}
                  onClick={() => setProfile(x)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full my-5">
          <ButtonAsset
            text="다음"
            className="w-24"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
