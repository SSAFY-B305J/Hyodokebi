import { axios } from "../utils/axios";

const REST_MEMBER_API = "/api/member";

// 일반 로그인
// TODO: post 같은데...? 백엔드랑 얘기해보기
export async function getLogin() {
  try {
    const data = await axios.get(REST_MEMBER_API + "/login/origin");
    return data.data;

    /**
     * NOTE
     * accessToken 받기 - localStorage에 저장 - 나중에 쿠키에 넣어보기
     * refreshToken 받기 - localStorage에 저장 - 나중에 쿠키에 넣어보기
     * expiredTime (만료기간) 받기 - localStorage에 저장 - 나중에 쿠키에 넣어보기
     *
     * axios 동작 시 헤더에 기본으로 붙도록 설정
     * axios.defaults.headers.common['x-access-token'] = res.data.data.accessToken
     */
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// TODO: accessToken 재발급 함수 구현

// TODO: 카카오 로그인 함수 구현
// 여기도 accessToken 받아야겠지...?
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
    const data = await axios.post(REST_MEMBER_API + "/regist", {
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
