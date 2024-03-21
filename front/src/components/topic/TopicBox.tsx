import useRecommendStore from "../../store/useRecommendStore";
import ButtonAsset from "../Button/ButtonAsset";

interface TopicBoxProps {
  isLogin: boolean;
}

export default function TopicBox({ isLogin }: TopicBoxProps) {
  // TODO 처음 페이지에 접근 할 때는 recom 값을 false로 가져가야 하지만, 새로고침은 
  const {recom, setRecom} = useRecommendStore()

  return (
    <div className="w-[75vw] h-[66vh] bg-secondary rounded-3xl p-3 flex">
      {recom ? (
        <div className="flex flex-col items-center justify-around w-full h-full">
          <div className="text-2xl font-semibold">오늘은 이 주제로 대화 해보세요.</div>
          <div className="text-xl">대나무헬리콥터의 우수성{}</div>
          <div className="flex items-center justify-center w-3/4 bg-white h-1/6 rounded-3xl">
            <div className="text-xl">
              대나무헬리콥터의 rpm을 알고 계신가요?{}
            </div>
          </div>
          {isLogin ?
          <ButtonAsset text="다시 추천 받기" onClick={()=>(console.log('in progress!'))} />
          :
          <button disabled className="p-3 bg-gray-400 border-gray-300 rounded-md">
            회원 가입 후 사용 가능합니다. 
          </button>
          }
          
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
