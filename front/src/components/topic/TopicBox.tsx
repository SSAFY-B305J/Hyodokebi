import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRecommendStore from "../../store/useRecommendStore";
import ButtonAsset from "../Button/ButtonAsset";
import { time } from "console";

interface TopicBoxProps {
  isLogin: boolean;
}

export default function TopicBox({ isLogin }: TopicBoxProps) {
  const { recom, setRecom } = useRecommendStore();
  const [isLoading, setIsLoading] = useState(true); // 페이지 로딩 시 항상 로딩 상태로 설정
  const navigate = useNavigate();
  const topicshow = Math.floor(Math.random() * 10);
  const show = Math.floor(Math.random() * 10);
  const clickToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("대화 주제를 복사 했습니다.");
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };
  const getContent = () => {
    return document.getElementById("question")?.innerHTML ?? "";
  };

  const randomtopictest = `testtopic${topicshow}`;
  const randomtest = `test${show}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  const sLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRecom(true);
    }, 1000);
  };
  const radnum: number = (new Date().getMilliseconds()) % 4
  

  return (
    <div className="w-[75vw] h-[66vh] bg-secondary border-secondary border-2 rounded-3xl p-3 flex">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <img src={`/loading_illust/loading_${radnum}.png`} className="w-[256px] h-[256px]"  alt="empty" />
          <div className="text-xl">로딩중...</div>
        </div>
      ) : recom ? (
        <div className="flex flex-col items-center justify-around w-full h-full">
          <div className="text-3xl font-semibold">
            오늘은 이 주제로 대화해보세요.
          </div>
          <div className="text-2xl">{randomtopictest}</div>
          <div className="flex flex-col items-center justify-center w-3/4 gap-3 bg-white h-1/6 rounded-3xl">
            <div
              className="flex justify-center text-2xl cursor-pointer"
              id="question"
              onClick={() => {
                clickToClipboard(getContent());
              }}
            >
              {randomtest}
            </div>
            <div className="flex text-xs">클릭하면 복사됩니다.</div>
          </div>
          {isLogin ? (
            <ButtonAsset
              text="다시 추천 받기"
              onClick={() => {
                sLoading();
              }}
            />
          ) : (
            <ButtonAsset
              text="비회원은 로그인 후 재추천 가능합니다."
              className="p-3 text-sm bg-gray-400 border-gray-300 rounded-md"
              onClick={() => {
                navigate("/login");
              }}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-around w-full h-full">
          <div className="text-2xl">대화 주제를 추천 해드립니다!</div>
          <ButtonAsset
            onClick={() => {
              sLoading(); // 로딩 시작
            }}
            text="추천 받기"
          />
        </div>
      )}
    </div>
  );
}
