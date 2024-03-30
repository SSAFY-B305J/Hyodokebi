import { create } from "zustand";
import { devtools } from "zustand/middleware";

// TODO: 현재 로그인한 유저의 id 저장

interface LoginState {
  isLogin: boolean;
  updateIsLogin: () => void;
}

const useLoginStore = create<LoginState>()(
  devtools((set) => ({
    isLogin: Boolean(localStorage.getItem("accessToken")),

    // isLogin 상태 업데이트 메서드
    updateIsLogin: () =>
      set(() => ({ isLogin: Boolean(localStorage.getItem("accessToken")) })),
  }))
);

export default useLoginStore;
