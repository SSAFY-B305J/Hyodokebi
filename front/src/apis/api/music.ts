import { axios } from "../utils/axios";

const REST_MUSIC_API = "api/music";

// TODO: 넌 VIP 아니니?
// VIP 전체 리스트 조회
export async function selectVipList() {
  try {
    const data = await axios.get("/api/vip");
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 음악 추천 리스트 조회
export async function selectRecommendedMusicList(vipId: string) {
  try {
    const data = await axios.get(REST_MUSIC_API + `/res/${vipId}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 음악 저장
export async function postSaveMusic(musicId: number, vipId: number) {
  try {
    const data = await axios.post(REST_MUSIC_API + `/save/${musicId}/${vipId}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 음악 저장 취소
export async function postCancelSaveMusic(musicId: number, vipId: number) {
  try {
    const data = await axios.delete(
      REST_MUSIC_API + `/save/${musicId}/${vipId}`
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 음악 싫어요
export async function postDislikeMusic(musicId: number, vipId: number) {
  try {
    const data = await axios.post(
      REST_MUSIC_API + `/dislike/${musicId}/${vipId}`
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// 음악 싫어요 취소
export async function postCancelDislikeMusic(musicId: number, vipId: number) {
  try {
    const data = await axios.delete(
      REST_MUSIC_API + `/dislike/${musicId}/${vipId}`
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
