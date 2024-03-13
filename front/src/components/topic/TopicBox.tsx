import { useState } from "react";

interface TopicBoxProps {
  isLogin: boolean;
}

export default function TopicBox({ isLogin }: TopicBoxProps) {
  const [recom, setRecom] = useState(false);

  return (
    <div className="w-[75vw] h-[66vh] bg-secondary rounded-3xl p-3 flex">
      {recom ? (
        <div className="flex flex-col items-center justify-around w-full h-full">
          <div className="text-2xl font-semibold">오늘은 이 주제로 대화 해보세요</div>
          <div className="text-xl">대나무헬리콥터의 우수성</div>
          <div className="flex items-center justify-center w-3/4 bg-white h-1/6 rounded-3xl">
            <div className="text-xl">
              대나무헬리콥터의 rpm을 알고 계신가요?
            </div>
          </div>
          {isLogin ?
          <button className="p-3 border rounded-md bg-secondary">
            또다시 추천
            {/* ALERT 해당 버튼은 임시, 버튼 컴포넌트를 만들어 사용하며, 로그인, 비로그인에 따른 분리 */}
          </button>
          :
          <button disabled className="p-3 bg-gray-400 border-gray-300 rounded-md">
            로그인 안하고 바라는게 너무나 많아
          </button>
          }
          
        </div>
      ) : (
        <div className="flex flex-col items-center justify-around w-full h-full">
          <div className="text-2xl">대화 주제를 추천 해드립니다!</div>
          <button onClick={() => setRecom(true)}>
            추천 받기
            {/* ALERT 해당 버튼은 임시, 버튼 컴포넌트를 만들어 사용하며, 로그인, 비로그인에 따른 분리 */}
          </button>
        </div>
      )}
    </div>
  );
}
