import { axios } from "../utils/axios";

const REST_FOOD_API = "/api/vip/sm";

// 선호 메뉴 목록
export async function getLikeFood(vipId: number) {
  try {
    const data = await axios.get(REST_FOOD_API + `/${vipId}`);

    // 선호 메뉴 정보 반환
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 선호 메뉴 추가
export async function postAddFood(vipId: number, foodList: string[]) {
  try {
    const data = await axios.post(REST_FOOD_API + `/${vipId}`, {
      foodList: foodList,
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
