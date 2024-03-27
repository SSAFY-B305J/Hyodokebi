import { Vip } from "../../modules/types/vip";
import { axios } from "../utils/axios";

// VIP 전체 리스트 조회
export async function selectVipList(): Promise<Vip[]> {
  const data = await axios.get("/api/vip");
  return data.data;
}

// 음악 추천 리스트 조회
export async function selectRecommendedMusicList(vipId: string) {
  const data = await axios.get(`/api/music/res/${vipId}`);
  return data.data;
}
