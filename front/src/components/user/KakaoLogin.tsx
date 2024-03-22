import { useEffect } from "react";

export default function KakaoLogin() {
  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get("code");
    console.log(code);
  });

  return <>카카오 로그인 완료</>;
}
