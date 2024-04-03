import { AxiosResponse } from "axios";

export function getAccessToken(): string {
  const token = localStorage.getItem("access_token");

  if (token) return token;
  else return "";
}

// Access Token 저장
export function updateAccessToken(data: AxiosResponse) {
  const accessToken = data.headers["accesstoken"] || "";
  localStorage.setItem("accessToken", accessToken);
}
