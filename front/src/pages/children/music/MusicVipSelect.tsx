import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Vip } from "../../../modules/types/vip";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import { selectVipList } from "../../../apis/api/music";

export default function MusicVipPage() {
  const [vipList, setVipList] = useState<Vip[]>([]);
  const [selectedVip, setSelectedVip] = useState<number>(0);

  const navigate = useNavigate();

  // select change 이벤트 핸들러
  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    setSelectedVip(Number(e.target.value));
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
    <div>
      <div>VIP 선택하기</div>
      <select value={selectedVip} onChange={handleChange}>
        {vipList.map((vip) => {
          return (
            <option key={vip.vipId} value={vip.vipId}>
              {vip.vipNickname}
            </option>
          );
        })}
      </select>
      <ButtonAsset text="추천받기" onClick={handleClick} />
    </div>
  );
}
