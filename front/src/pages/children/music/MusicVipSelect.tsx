import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Vip } from "../../../modules/types/vip";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import { getVipList } from "../../../apis/api/vip";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import useLoginStore from "../../../store/useLoginStore";

export default function MusicVipSelect() {
  const [vipList, setVipList] = useState<Vip[]>([]);
  const [selectedVip, setSelectedVip] = useState<string>("");

  const navigate = useNavigate();
  const { loginMemberIdx, getIsLogin } = useLoginStore();
  const { pathname } = useLocation();

  // select change 이벤트 핸들러
  function handleChange(e: SelectChangeEvent<string>): void {
    setSelectedVip(e.target.value);
  }

  // vipList의 값을 저장한다.
  // vip가 있으면 첫 번째 vip의 값을 selectedVip에 저장한다.
  async function initVipList() {
    const data = await getVipList(loginMemberIdx);
    setVipList(data);
    if (data?.length > 0) setSelectedVip(data[0].vipId);
  }

  function handleClick() {
    navigate(`/music/${selectedVip}`);
  }

  useEffect(() => {
    // 로그인하지 않았으면 로그인 화면으로 이동
    if (!getIsLogin() || !loginMemberIdx) {
      navigate("/login", { state: pathname });
    }

    // VIP 목록 가져오기
    initVipList();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold">
        효도깨비가 VIP께 노래를 추천해드립니다.
      </h2>
      {vipList.length ? (
        <>
          <div className="my-16 w-80">
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={selectedVip}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {vipList?.map((vip) => {
                  return (
                    <MenuItem key={vip.vipId} value={vip.vipId}>
                      {vip.vipNickname}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <ButtonAsset text="추천받기" size="lg" onClick={handleClick} />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center my-16">
          <div className="mb-5 text-lg">아직 VIP를 등록하지 않으셨나요?</div>
          <Link to={`/mypage/${loginMemberIdx}/vip/create`}>
            <ButtonAsset text="VIP 생성하러 가기" size="lg" />
          </Link>
        </div>
      )}
    </div>
  );
}
