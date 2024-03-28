import { Vip } from "../../modules/types/vip";
import { axios } from "../utils/axios";

// 추후 수정
export async function selectVipList(): Promise<Vip[]> {
  const data = await axios.get("/api/vip");
  return data.data;
}
