import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface LoginState {
  loginMemberId: number;
  setLoginMemberId: (by: number) => void;
  getIsLogin: () => boolean;
  logout: () => void;
}

const useLoginStore = create<LoginState>()(
  persist(
    devtools((set, get) => ({
      loginMemberId: 0,
      setLoginMemberId: (by: number) => set(() => ({ loginMemberId: by })),
      getIsLogin: () => Boolean(localStorage.getItem("accessToken")),
      logout: () => {
        localStorage.removeItem("accessToken");
        get().setLoginMemberId(0);
      },
    })),
    {
      name: "login-state",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useLoginStore;
