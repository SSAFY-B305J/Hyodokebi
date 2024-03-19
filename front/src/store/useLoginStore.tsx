import { create } from "zustand";
import { devtools } from "zustand/middleware"

const useLoginStore = create(devtools((set) => ({
  isLogin: false,
  setIsLogin: () => set(() => ({ isLogin: true}))
  // 로그인 로직에 따른 설정
  
})))