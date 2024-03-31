import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface LoginState {
  loginMemberId: number;
  setLoginMemberId: (by: number) => void;
  getIsLogin: () => boolean;
}

const useLoginStore = create<LoginState>()(
  persist(
    devtools((set) => ({
      loginMemberId: 0,
      setLoginMemberId: (by: number) => set(() => ({ loginMemberId: by })),
      getIsLogin: () => Boolean(localStorage.getItem("accessToken")),
    })),
    {
      name: "login-state",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useLoginStore;
