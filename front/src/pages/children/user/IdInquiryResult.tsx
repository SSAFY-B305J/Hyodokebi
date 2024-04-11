import { Link } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import FormContainer from "../../../components/user/FormContainer";
import { useEffect, useState } from "react";
import { getSearchId } from "../../../apis/api/member";
import useInquiryStore from "../../../store/useInquiryStore";
import { CircularProgress } from "@mui/material";

export default function IdInquiryResult() {
  const { email, setEmail } = useInquiryStore();

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState("");

  async function searchResult() {
    try {
      const data = await getSearchId(email);

      // 앞의 두자리만 결과로 보여준다.
      const result = data.slice(0, 2) + "*".repeat(data.length - 2);
      setResult(result);

      setIsLoading(false);
      setEmail(""); // 입력한 이메일 초기화
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    searchResult();
  }, []);

  return (
    <FormContainer>
      <>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center w-full h-[300px]">
            <CircularProgress color="warning" />
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="mb-6 text-3xl font-bold">아이디 찾기 결과</h1>
              <h2>해당 이메일로 가입된 계정은 다음과 같습니다.</h2>
            </div>
            <div className="mx-auto my-12 text-center w-72">
              <p className="font-bold">{result}</p>
            </div>
            {/* TODO: 이메일 보내기 */}
            <div className="flex justify-center my-3">
              <Link to="/login">
                <ButtonAsset
                  text="로그인하기"
                  variant="outlined"
                  className="mx-3"
                />
              </Link>
              <Link to="/help/pwInquiry">
                <ButtonAsset text="비밀번호 찾기" className="mx-3" />
              </Link>
            </div>
          </>
        )}
      </>
    </FormContainer>
  );
}
