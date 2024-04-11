import { updateAccessToken } from "../../modules/auth/accessToken";
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
export async function postAddFood(vipId: number, foodList: number[]) {
  try {
    const data = await axios.post(REST_FOOD_API + `/${vipId}`, foodList, {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("accessToken"),
      },
    });

    updateAccessToken(data);

    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 메뉴 기본 목록 조회
export async function getPlainFood() {
  try {
    const data = await axios.get("/api/wc");

    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// vip 별 메뉴 추천
export async function postRecommendFood(vipId: number, addData: number[]) {
  try {
    const data = await axios.post(`/api/menu/${vipId}`, addData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });

    updateAccessToken(data);

    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
