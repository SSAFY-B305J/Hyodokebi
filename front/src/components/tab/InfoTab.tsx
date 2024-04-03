import useTabStore from "../../store/useTabStore";
import { useEffect, useState } from "react";
import { getLikeFood } from "../../apis/api/food";
import MenuCard from "../card/MenuCard";
import { getVipMusic } from "../../apis/api/vip";
import MusicCard from "../card/MusicCard";

interface LikeFoodData {
  menuId: number;
  menuName: string;
  cateImage: number;
}

interface LikeMusicData {
  musicId: number;
  musicYear: number;
  musicName: string;
  musicSinger: string;
  musicImg: string;
  musicLyrics: string;
  musicGenre: string;
  musicComposer: string;
}

export default function InfoTab({ vipId }: { vipId: number }) {
  const { tabIndex, setTabIndex } = useTabStore();

  const [likeFood, setLikeFood] = useState<LikeFoodData[]>([]);
  const [likeMusic, setLikeMusic] = useState<LikeMusicData[]>([]);

  async function getLikedFood() {
    try {
      const data = await getLikeFood(vipId);
      setLikeFood(data);
    } catch (error) {
      console.error("Error fetching VIP Detail:", error);
    }
  }
  async function getLikedMusic() {
    try {
      const data = await getVipMusic(vipId);
      setLikeMusic(data);
    } catch (error) {
      console.error("Error fetching VIP Detail:", error);
    }
  }

  useEffect(() => {
    getLikedMusic();
    getLikedFood();
  }, []);

  const disabled =
    "flex items-center justify-center w-1/2 shadow-md h-full duration-300 text-xl font-semibold border-b border-current";
  const activated =
    "flex items-center justify-center w-1/2 shadow-md h-full bg-secondary duration-300 text-xl font-semibold border-current border-t border-l border-r";

  return (
    <div className="flex flex-col w-[66vw] m-3 h-[10vh] p-2 box-border">
      <div className="flex flex-row w-[66vw] h-[8vh] box-border">
        <div
          className={tabIndex === 0 ? activated : disabled}
          onClick={() => setTabIndex(0)}
        >
          음악
        </div>
        <div
          className={tabIndex === 1 ? activated : disabled}
          onClick={() => setTabIndex(1)}
        >
          좋아하는 메뉴
        </div>
        {/* <div
          className={tabIndex === 2 ? activated : disabled}
          onClick={() => setTabIndex(2)}
        >
          음식점
        </div> */}
      </div>
      {tabIndex === 0 && (
        <div className="flex justify-center w-full h-[72vh]">
          {likeMusic && likeMusic.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {likeMusic.map((music, index) => (
                <MusicCard
                  key={index}
                  id={music.musicId}
                  image={music.musicImg}
                  title={music.musicName}
                  subTitle={music.musicSinger}
                  vipId={Number(vipId)}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-500">좋아하는 음악이 없습니다.</div>
          )}
        </div>
      )}

      {tabIndex === 1 && (
        <div className="w-full">
          {likeFood && likeFood.length > 0 ? (
            <div className="flex flex-wrap ">
              {likeFood.map((menu, index) => (
                <div key={index} className="w-1/4 p-2">
                  <MenuCard
                    menu_id={menu.menuId}
                    menu_name={menu.menuName}
                    cate_image={menu.cateImage}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              아직 좋아하는 음식을 담지 않으셨군요! 음식 추천을 이용해보세요!
            </div>
          )}
        </div>
      )}

      {/* {tabIndex === 2 ? (
        <div className="flex justify-center w-full h-[72vh]"></div>
      ) : (
        ""
      )} */}
    </div>
  );
}
