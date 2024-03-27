import { useParams } from "react-router-dom";
import { selectRecommendedMusicList } from "../../../apis/api/music";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import { useCallback, useEffect, useState } from "react";
import MusicCard from "../../../components/card/MusicCard";

type Music = {
  musicId: number;
  musicYear: number;
  musicName: string;
  musicSinger: string;
  musicImg: string;
  musicLyrics: string;
};

type MusicList = {
  [key: string]: Music[];
  Teenage: Music[];
  Twenties: Music[];
  Thirties: Music[];
};

type MusicIdx = {
  [key: string]: number;
  Teenage: number;
  Twenties: number;
  Thirties: number;
};

const MusicAge = {
  Teenage: "Teenage",
  Twenties: "Twenties",
  Thirties: "Thirties",
};

export default function MusicResult() {
  const vipId = useParams().vipId + "";

  // 전체 음악 리스트
  const [musicList, setMusicList] = useState<MusicList>({
    Teenage: [],
    Twenties: [],
    Thirties: [],
  });

  // 모든 출력할 음악 시작 인덱스
  const [currIdx, setCurrIdx] = useState<MusicIdx>({
    Teenage: 0,
    Twenties: 0,
    Thirties: 0,
  });

  // 활성화된 탭의 연령대
  const [activeAge, setActiveAge] = useState(MusicAge.Teenage);

  // 현재 활성화된 탭에서 출력할 음악의 시작 인덱스
  const displayIdx = currIdx[`${activeAge}`];

  // 모든 음악 추천 결과 리스트를 가져오기
  const getMusicList = useCallback(async () => {
    const data = await selectRecommendedMusicList(vipId);
    setMusicList(data);
  }, [vipId]);

  // 다시 추천하기 버튼 클릭 핸들러
  // 현재 활성화된 탭의 음악 시작 인덱스를 3 더한다.
  function handleClickMore() {
    setCurrIdx((prev) => {
      const temp = { ...prev };
      temp[`${activeAge}`] += 3;
      return temp;
    });
  }

  useEffect(() => {
    getMusicList();
  }, [getMusicList]);

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100">
      <h1>음악 추천 결과</h1>
      <div className="w-[768px] p-5 box-content rounded-lg">
        <button
          className={`w-64 border border-silver h-14 ${
            activeAge === MusicAge.Teenage ? "bg-silver" : "bg-lightsilver"
          }`}
          value={MusicAge.Teenage}
          onClick={(e) => setActiveAge(e.currentTarget.value)}
        >
          10대
        </button>
        <button
          className={`w-64 border border-silver h-14 ${
            activeAge === MusicAge.Twenties ? "bg-silver" : "bg-lightsilver"
          }`}
          value={MusicAge.Twenties}
          onClick={(e) => setActiveAge(e.currentTarget.value)}
        >
          20대
        </button>
        <button
          className={`w-64 border border-silver h-14 ${
            activeAge === MusicAge.Thirties ? "bg-silver" : "bg-lightsilver"
          }`}
          value={MusicAge.Thirties}
          onClick={(e) => setActiveAge(e.currentTarget.value)}
        >
          30대
        </button>
      </div>
      <div className="w-[800px] flex flex-wrap justify-center items-center my-4">
        {musicList[`${activeAge}`] &&
        displayIdx < musicList[`${activeAge}`].length ? (
          musicList[`${activeAge}`]
            .slice(displayIdx, displayIdx + 3)
            .map((music) => (
              <MusicCard
                key={music.musicId}
                title={music.musicName}
                subTitle={music.musicSinger}
                image={music.musicImg}
              ></MusicCard>
            ))
        ) : (
          <div>추천 보따리가 텅 비었어요...</div>
        )}
      </div>
      <ButtonAsset
        text="다시 추천받기"
        onClick={handleClickMore}
        disabled={displayIdx + 3 >= musicList[`${activeAge}`].length}
      />
    </div>
  );
}
