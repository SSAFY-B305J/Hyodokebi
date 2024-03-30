import { axios } from "../utils/axios";

const REST_VIP_API = "api/vip";

// member의 VIP 목록 조회
export async function getVipList(memberId: number) {
  try {
    const data = await axios.get(`/api/myvip/${memberId}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
