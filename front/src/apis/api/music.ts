import { Vip } from "../../modules/types/vip";
import { axios } from "../utils/axios";

// VIP 전체 리스트 조회
export async function selectVipList(): Promise<Vip[]> {
  const data = await axios.get("/api/vip");
  return data.data;
}
