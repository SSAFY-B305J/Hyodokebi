import { useEffect, useState } from "react";
import { getKakaoLogin } from "../../apis/api/member";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function KakaoLogin() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function doKakaoLogin() {
      try {
        const code = new URL(document.location.toString()).searchParams.get(
          "code"
        );

        console.log(code);

        if (code) {
          const data = await getKakaoLogin(code);
          console.log(data);
        }

        setIsLoading(false);

        // 로그인하기 이전 페이지로 이동
        // if (state) navigate(state);
        // else navigate("/");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    doKakaoLogin();
  });

  return (
    <>
      {isLoading && (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <CircularProgress color="warning" />
          <div className="my-8 text-xl">로그인 중입니다.</div>
        </div>
      )}
    </>
  );
}
