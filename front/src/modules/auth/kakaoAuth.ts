export const REST_API_KEY = process.env.REACT_APP_KAKAO_OAUTH_KEY;
export const REDIRECT_URI =
  "https://hyodokebi.duckdns.org/api/member/login/kakao";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
