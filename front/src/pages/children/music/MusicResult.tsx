import { useEffect, useState } from "react";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import MusicCard from "../../../components/card/MusicCard";

type Music = {
  musicId: number;
  musicYear: number;
  musicName: string;
  musicSinger: string;
  musicImg: string;
  musicLyrics: string;
};

const data = [
  {
    musicId: 1,
    musicYear: 1964,
    musicName: "내일또 만납시다",
    musicSinger: "금호동",
    musicImg:
      "https://cdnimg.melon.co.kr/cm/album/images/021/81/151/2181151_500.jpg/melon/resize/282/quality/80/optimize",
    musicLyrics:
      "하루의 일을 끝내고 돌아가는\n거리엔 사람의 물결\n하늘엔 별이 하나 둘 반짝이면\n가로등 하나 둘 꽃 피네\n허공을 스치는 바람은 차고\n흐뭇한 마음은 애드베룬\n가벼운 발길 헤어질 때 인사는\n내일 또 다시 만납시다\n하루의 일을 끝내고 돌아가는\n거리엔 사람의 물결\n하늘엔 별이 하나 둘 반짝이면\n가로등 하나 둘 꽃 피네\n허공을 스치는 바람은 차고\n흐뭇한 마음은 애드베룬\n가벼운 발길 헤어질 때 인사는\n내일 또 다시 만납시다\n내일 또 다시 만납시다",
  },
  {
    musicId: 2,
    musicYear: 1964,
    musicName: "눈물의 연평도",
    musicSinger: "최숙자",
    musicImg:
      "https://cdnimg.melon.co.kr/cm/album/images/003/10/199/310199_500.jpg/melon/resize/282/quality/80/optimize",
    musicLyrics:
      "조기를 담뿍잡아\n기폭을 올리고\n온다던 그배는\n어이하여 아니오나\n수평선 바라보며\n그이름 부르면\n갈매기도 우는구나\n눈물의 연평도\n\n태풍이 원수더라\n한많은 사라호\n황천간 그얼굴\n언제다시 만나보리\n해저문 백사장에\n그모습 그리면\n등대불만 깜박이네\n눈물의 연평도",
  },
  {
    musicId: 3,
    musicYear: 1964,
    musicName: "님이라 부르리까",
    musicSinger: "이미자",
    musicImg:
      "https://cdnimg.melon.co.kr/cm/album/images/003/59/919/359919_500.jpg/melon/resize/282/quality/80/optimize",
    musicLyrics:
      "<1절\n임이라 부르리까 당신이라고 부르리까\n사랑을 하면서도 사랑을 참고사는\n마음으로만 그리워 마음으로만 사무쳐\n애타는 가슴\n그무슨 잘못이라도 있는 것 처럼\n울어야만 됩니까 울어야만 됩니까\n\n<2절\n임이라 부르리까 당신이라고 부르리까\n밤이면 꿈에선가 다정이 만나보고\n잊지못하고 언제나 가슴속에만 간직한 못난이 마음\n그무슨 잘못이라도 있는 것처럼\n울어야만 됩니까 울어야만 됩니까",
  },
];

export default function MusicResult() {
  const [musicList, setMusicList] = useState<Music[]>([]);

  useEffect(() => {
    setMusicList(data);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1>음악 추천 결과</h1>
      <div>
        <ButtonAsset text="10대" />
        <ButtonAsset text="20대" />
        <ButtonAsset text="30대" />
      </div>
      <div className="w-[800px] flex flex-wrap justify-center items-center my-4">
        {musicList.map((music) => (
          <MusicCard
            image={music.musicImg}
            title={music.musicName}
            subTitle={music.musicSinger}
          />
        ))}
      </div>
    </div>
  );
}
