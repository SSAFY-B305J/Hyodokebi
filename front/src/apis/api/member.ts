import { isAxiosError } from "axios";
import { axios } from "../utils/axios";

const REST_MEMBER_API = "/api/member";

// 일반 로그인
export async function postLogin(id: string, password: string) {
  try {
    const data = await axios.post(REST_MEMBER_API + "/login/origin", {
      memberId: id,
      memberPass: password,
    });

    console.log(data.data);

    // Access Token 저장
    const accessToken = data.headers["accesstoken"] || "";
    console.log(accessToken);
    localStorage.setItem("accessToken", accessToken);

    // TODO: Refresh Token 저장
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.status + "");
    }
  }
}

// TODO: accessToken 재발급 함수 구현
export async function setToken() {
  // 만료 시간이 지났을 경우
  // Refresh Token을 이용하여 Access Token 재발급
}

// TODO: 카카오 로그인 함수 구현
export async function getKakaoLogin(code: string) {
  try {
    const data = await axios.get(REST_MEMBER_API + `/login/${code}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 회원가입
// WARNING: 프로필 이미지 생각하기 - 어떤 이미지, 어떤 값
export async function postRegist(
  id: string,
  password: string,
  email: string,
  nickname: string,
  profile: string
) {
  try {
    const data = await axios.post(REST_MEMBER_API + "/join", {
      memberId: id,
      memberPass: password,
      memberEmail: email,
      memberNickname: nickname,
      memberProfile: profile,
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 아이디 중복 검사
export async function getDuplicateCheckId(id: string) {
  try {
    const data = await axios.get(REST_MEMBER_API + `/check/id/${id}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 이메일 중복 검사
export async function getDuplicateCheckEmail(email: string) {
  try {
    const data = await axios.get(REST_MEMBER_API + `/check/email/${email}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 닉네임 중복 검사
export async function getDuplicateCheckNickname(nickname: string) {
  try {
    const data = await axios.get(
      REST_MEMBER_API + `/check/nickname/${nickname}`
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
