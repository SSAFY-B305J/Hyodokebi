import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Vip } from "../../../modules/types/vip";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import { selectVipList } from "../../../apis/api/music";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function MusicVipSelect() {
  const [vipList, setVipList] = useState<Vip[]>([]);
  const [selectedVip, setSelectedVip] = useState<string>("");

  const navigate = useNavigate();

  // select change 이벤트 핸들러
  function handleChange(e: SelectChangeEvent<string>): void {
    setSelectedVip(e.target.value);
  }

  // TODO: 유저의 Vip 리스트가 출력되도록 수정 필요 (API 수정 시)
  // WARNING: Vip가 없을 경우 화면 처리하기

  // vipList의 값을 저장한다.
  // vip가 있으면 첫 번째 vip의 값을 selectedVip에 저장한다.
  async function getVipList() {
    const data: Vip[] = await selectVipList();
    setVipList(data);
    if (data.length > 0) setSelectedVip(data[0].vipId);
  }

  // TODO: 라우터 연결 후 확인하기
  function handleClick() {
    navigate(`/music/${selectedVip}`);
  }

  useEffect(() => {
    getVipList();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold">
        효도깨비가 VIP께 노래를 추천해드립니다.
      </h2>
      <div className="my-16 w-80">
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedVip}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {vipList.map((vip) => {
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
    </div>
  );
}
