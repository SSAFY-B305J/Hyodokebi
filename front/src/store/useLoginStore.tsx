import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import Member from "../modules/types/member";
import { getMemberInfo } from "../apis/api/member";
import { getAccessToken } from "../modules/auth/accessToken";

interface LoginState {
  loginMemberIdx: number;
  loginMember: Member | null;
  setLoginMemberIdx: (by: number) => void;
  setLoginMember: (by: Member | null) => void;
  getIsLogin: () => boolean;
  updateLoginMember: () => Promise<void>;
  logout: () => void;
}

const useLoginStore = create<LoginState>()(
  persist(
    devtools((set, get) => ({
      loginMemberIdx: 0,
      loginMember: null,
      setLoginMemberIdx: (by: number) => set(() => ({ loginMemberIdx: by })),
      setLoginMember: (by) => set(() => ({ loginMember: by })),
      getIsLogin: () => Boolean(getAccessToken()),

      // 로그인 회원 정보 업데이트
      updateLoginMember: async () => {
        try {
          const data = await getMemberInfo();
          get().setLoginMemberIdx(data?.idx);
          get().setLoginMember(data?.info);
        } catch (error) {
          if (error instanceof Error) {
            if (error.message === "500") {
              throw error;
            }
          }
        }
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        get().setLoginMemberIdx(0);
        get().setLoginMember(null);
      },
    })),
    {
      name: "login-state",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useLoginStore;
