import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRecommendStore from "../../store/useRecommendStore";
import ButtonAsset from "../Button/ButtonAsset";
import topicData from "../../json/TalkTopic.json";
import { CircularProgress, Tooltip } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

interface TopicBoxProps {
  isLogin: boolean;
}

export default function TopicBox({ isLogin }: TopicBoxProps) {
  // const { recom, setRecom } = useRecommendStore(); // 이전 질문 저장, 중복 방지
  const [isLoading, setIsLoading] = useState(false); // 페이지 로딩 시 항상 로딩 상태로 설정
  const navigate = useNavigate();

  const [isResultScreen, setIsResultScreen] = useState(false);

  const clickToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("대화 주제를 복사 했습니다.");
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  const getRandomTopicIndex = () =>
    Math.floor(Math.random() * topicData.length);

  const [topicIndex, setTopicIndex] = useState(0);
  const randomTopic = topicData[topicIndex];

  const initTopic = () => {
    sLoading();
    setIsResultScreen(true);
    setTopicIndex(getRandomTopicIndex());
  };

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
    }, 1000);
  };

  return (
    <div className="border-2 border-lightsilver rounded-md w-[550px] min-h-[300px] py-10 flex flex-col justify-center items-center">
      {!isResultScreen && (
        <div className="flex flex-col items-center">
          <h1 className="mb-10 text-3xl font-semibold">오늘의 대화 주제는?</h1>
          <ButtonAsset text="대화 주제 추천 받기" onClick={initTopic} />
        </div>
      )}

      {isResultScreen && isLoading && (
        <div className="flex flex-col items-center my-8">
          <CircularProgress color="warning" />
          <p className="my-3">효도깨비가 고민중...</p>
        </div>
      )}
      {isResultScreen && !isLoading && (
        <div className="flex flex-col items-center">
          <div className="text-center text-gray-500">오늘의 대화 주제</div>
          <div className="my-8">
            <h3 className="mb-8 text-3xl font-semibold text-center">
              {randomTopic.topic}
            </h3>
            <div className="flex items-center whitespace-pre-wrap">
              <div className="w-[400px] bg-gray-100 text-center p-3 rounded-md">
                {randomTopic.question}
              </div>
              <Tooltip title="복사" arrow>
                <button
                  className="ml-3"
                  onClick={() => clickToClipboard(randomTopic.question)}
                >
                  <ContentCopy />
                </button>
              </Tooltip>
            </div>
          </div>
          {isLogin ? (
            <ButtonAsset text="다시 추천 받기" onClick={initTopic} />
          ) : (
            <ButtonAsset
              text="비회원은 로그인 후 재추천 가능합니다."
              variant="outlined"
              className="p-3 text-sm bg-gray-400 border-gray-300 rounded-md"
              onClick={() => {
                navigate("/login");
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
