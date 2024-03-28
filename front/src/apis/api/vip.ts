import { axios } from "../utils/axios";

const REST_VIP_API = "api/vip";

// VIP 전체 리스트 조회
export async function selectVipList() {
  try {
    const data = await axios.get(REST_VIP_API);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// VIP 추가
export async function postVip() {
  try {
    const data = await axios.post(REST_VIP_API);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// vipId: number

// 특정 VIP 조회
export async function getVip(vipId: number) {
  try {
    const data = await axios.get(REST_VIP_API+`/${vipId}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 특정 VIP 수정
export async function putVip(vipId: number) {
  try {
    const data = await axios.put(REST_VIP_API+`/${vipId}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 특정 VIP 삭제
export async function deleteVip(vipId: number) {
  try {
    const data = await axios.delete(REST_VIP_API+`/${vipId}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
