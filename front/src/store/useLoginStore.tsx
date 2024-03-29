import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
