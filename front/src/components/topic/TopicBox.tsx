import useRecommendStore from "../../store/useRecommendStore";
import ButtonAsset from "../Button/ButtonAsset";

interface TopicBoxProps {
  isLogin: boolean;
}

export default function TopicBox({ isLogin }: TopicBoxProps) {
  const { recom, setRecom } = useRecommendStore();
  const topicshow = Math.floor(Math.random() * 10);
  const show = Math.floor(Math.random() * 10);
  const randomtopictest = `testtopic${topicshow}`
  const randomtest = `test${show}`; 
  // json 내부 배열 길이에 따라 다르게 할 필요 있음
  

  return (
    <div className="w-[75vw] h-[66vh] bg-secondary rounded-3xl p-3 flex">
      {recom ? (
        <div className="flex flex-col items-center justify-around w-full h-full">
          <div className="text-2xl font-semibold">
            오늘은 이 주제로 대화 해보세요.
          </div>
          <div className="text-xl">{randomtopictest}</div>
          <div className="flex items-center justify-center w-3/4 bg-white h-1/6 rounded-3xl">
            <div className="text-xl">{randomtest}</div>
          </div>
          {isLogin ? (
            <ButtonAsset
              text="다시 추천 받기"
              onClick={()=>(window.location.reload())}
            />
          ) : (
            <button
              disabled
              className="p-3 bg-gray-400 border-gray-300 rounded-md"
            >
              회원 가입 후 사용 가능합니다.
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-around w-full h-full">
          <div className="text-2xl">대화 주제를 추천 해드립니다!</div>
          <ButtonAsset onClick={() => setRecom(true)} text="추천 받기" />
        </div>
      )}
    </div>
  );
}
