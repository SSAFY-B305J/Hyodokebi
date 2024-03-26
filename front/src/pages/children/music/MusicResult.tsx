import { MouseEvent, useCallback, useEffect, useState } from "react";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import MusicCard from "../../../components/card/MusicCard";
import { axios } from "../../../apis/utils/axios";

type Music = {
  musicId: number;
  musicYear: number;
  musicName: string;
  musicSinger: string;
  musicImg: string;
  musicLyrics: string;
};

type RecommendedMusicList = {
  [key: string]: Music[];
  Teenage: Music[];
  Twenties: Music[];
  Thirties: Music[];
};

type RecommendedMusicListIndex = {
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
  const [musicList, setMusicList] = useState<RecommendedMusicList>({
    Teenage: [],
    Twenties: [],
    Thirties: [],
  });

  const [activeAge, setActiveAge] = useState(MusicAge.Teenage);
  const [musicIndex, setMusicIndex] = useState<RecommendedMusicListIndex>({
    Teenage: 0,
    Twenties: 0,
    Thirties: 0,
  });

  const [currMusicList, setCurrMusicList] = useState<Music[]>();

  async function selectRecommendedMusicList(vipId: number) {
    const data = await axios.get(`/api/music/res/${vipId}`);
    return data.data;
  }

  const getAllMusicList = useCallback(async (vipId: number) => {
    const data = await selectRecommendedMusicList(vipId);
    setMusicList(data);
  }, []);

  useEffect(() => {
    getAllMusicList(5);
  }, [getAllMusicList]);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    setActiveAge(e.currentTarget.value);
  }

  function getActiveMusicList() {
    const list = musicList[activeAge];
    const index = musicIndex[activeAge];

    const result = [];

    for (let i = 0; i < 3; i++) {
      result.push(list[index + i]);
    }

    setCurrMusicList(result);
  }

  getActiveMusicList();

  return (
    <div className="flex flex-col items-center">
      <h1>음악 추천 결과</h1>
      <div>
        <ButtonAsset
          text="10대"
          value={MusicAge.Teenage}
          onClick={handleClick}
        />
        <ButtonAsset
          text="20대"
          value={MusicAge.Twenties}
          onClick={handleClick}
        />
        <ButtonAsset
          text="30대"
          value={MusicAge.Thirties}
          onClick={handleClick}
        />
      </div>
      <div className="w-[800px] flex flex-wrap justify-center items-center my-4">
        {/* {getActiveMusicList().map((music) => (
          <MusicCard
            image={music.musicImg}
            title={music.musicName}
            subTitle={music.musicSinger}
          />
        ))} */}
      </div>
    </div>
  );
}
