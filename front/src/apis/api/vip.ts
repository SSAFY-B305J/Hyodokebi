import { axios } from "../utils/axios";

const REST_VIP_API = "api/vip";

// member의 VIP 목록 조회
export async function getVipList(memberId: number) {
  try {
    const data = await axios.get(`/api/myvip/${memberId}`);
    return data.data;
  } catch (error) {
    throw error;
    // console.error("Error fetching data:", error);
  }
}

export async function selectVipList() {
  try {
    const data = await axios.get(REST_VIP_API);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// VIP 추가
export async function postVip(memberId: number, vipData: object) {
  try {
    const data = await axios.post(REST_VIP_API + `/${memberId}`, vipData);
    console.log(memberId);
    console.log(vipData);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// vipId: number

// 특정 VIP 조회
export async function getVip(vipId: number) {
  try {
    const data = await axios.get(REST_VIP_API + `/${vipId}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 특정 VIP 수정
export async function putVip(vipId: number, vipData: object) {
  try {
    const data = await axios.put(REST_VIP_API + `/${vipId}`, vipData);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 특정 VIP 삭제
export async function deleteVip(vipId: number) {
  try {
    const data = await axios.delete(REST_VIP_API + `/${vipId}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// VIP가 저장한 음악 여부
export async function getIsVipMusicSaved(vipId: number, musicId: number) {
  try {
    const data = await axios.get(REST_VIP_API + `/music/${vipId}/${musicId}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
