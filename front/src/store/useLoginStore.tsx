import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LoginState {
  loginMemberId: number;
  setLoginUserId: (by: number) => void;
  getIsLogin: () => boolean;
}

const useLoginStore = create<LoginState>()(
  devtools((set) => ({
    loginMemberId: 0,
    setLoginUserId: (by: number) => set(() => ({ loginMemberId: by })),
    getIsLogin: () => Boolean(localStorage.getItem("accessToken")),
  }))
);

export default useLoginStore;
