import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  postCancelDislikeMusic,
  postCancelSaveMusic,
  postDislikeMusic,
  postSaveMusic,
} from "../../apis/api/music";

export default function MusicCard(props: {
  id: number;
  image: string;
  title: string;
  subTitle: string;
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [isDislike, setIsDislike] = useState(false);

  const vipId = Number(useParams().vipId);

  // 저장 버튼 클릭 핸들러
  async function handleClickSaveButton() {
    if (!isSaved) await postSaveMusic(props.id, vipId);
    else await postCancelSaveMusic(props.id, vipId);

    setIsSaved((prev) => (prev = !prev));
  }

  // 싫어요 버튼 클릭 핸들러
  async function handleClickDislikeButton() {
    if (!isDislike) await postDislikeMusic(props.id, vipId);
    else await postCancelDislikeMusic(props.id, vipId);

    setIsDislike((prev) => (prev = !prev));
  }

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
        <button className="mr-8">
          {isSaved ? (
            <BookmarkIcon onClick={handleClickSaveButton} />
          ) : (
            <BookmarkBorderIcon onClick={handleClickSaveButton} />
          )}
        </button>
        <button>
          {isDislike ? (
            <ThumbDownIcon onClick={handleClickDislikeButton} />
          ) : (
            <ThumbDownOutlinedIcon onClick={handleClickDislikeButton} />
          )}
        </button>
      </div>
    </div>
  );
}
