import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  postCancelDislikeMusic,
  postCancelSaveMusic,
  postDislikeMusic,
  postSaveMusic,
} from "../../apis/api/music";
import { Tooltip } from "@mui/material";
import { getIsVipMusicSaved, getVipDislikeMusicList } from "../../apis/api/vip";

type Music = {
  musicId: number;
  musicYear: number;
  musicName: string;
  musicSinger: string;
  musicImg: string;
  musicLyrics: string;
  musicGenre: string;
  musicComposer: string;
};

export default function MusicCard(props: {
  id: number;
  image: string;
  title: string;
  subTitle: string;
  vipId: number;
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [isDislike, setIsDislike] = useState(false);

  const vipId = Number(useParams().vipId);

  // 저장 버튼 클릭 핸들러
  async function handleClickSaveButton() {
    if (!isSaved) await postSaveMusic(props.id, vipId);
    else await postCancelSaveMusic(props.id, vipId);

    initIsSaved();
  }

  // 싫어요 버튼 클릭 핸들러
  async function handleClickDislikeButton() {
    if (!isDislike) await postDislikeMusic(props.id, vipId);
    else await postCancelDislikeMusic(props.id, vipId);

    setIsDislike((prev) => (prev = !prev));
  }

  // 저장된 음악인지 조회 후 적용
  const initIsSaved = useCallback(async () => {
    setIsSaved(await getIsVipMusicSaved(props.vipId, props.id));
  }, [props.id, props.vipId]);

  // 싫어요한 음악인지 조회 후 적용
  const initisDislike = useCallback(async () => {
    const data: Music[] = await getVipDislikeMusicList(props.vipId); // VIP가 싫어요한 음악 리스트
    setIsDislike(data.some((el) => el.musicId === props.id));
  }, [props.id, props.vipId]);

  useEffect(() => {
    initIsSaved();
    initisDislike();
  }, [initIsSaved, initisDislike]);

  return (
    <div className="flex flex-col items-center w-56 h-64 px-3 py-3 m-3 bg-white border border-gray-300 shadow-md rounded-xl hover:shadow-lg">
      <img
        src={props.image}
        alt={props.title}
        className="object-cover rounded-full w-28 h-28"
      />
      <div className="flex flex-col justify-center h-full text-center">
        <h3 className="text-lg font-bold">{props.title}</h3>
        <div>{props.subTitle}</div>
      </div>
      <div className="flex justify-center">
        <Tooltip title="음악을 저장합니다.">
          <button className="mr-8">
            {isSaved ? (
              <BookmarkIcon onClick={handleClickSaveButton} />
            ) : (
              <BookmarkBorderIcon onClick={handleClickSaveButton} />
            )}
          </button>
        </Tooltip>
        <Tooltip title="이 음악은 앞으로 추천받고 싶지 않습니다.">
          <button>
            {isDislike ? (
              <ThumbDownIcon onClick={handleClickDislikeButton} />
            ) : (
              <ThumbDownOutlinedIcon onClick={handleClickDislikeButton} />
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
