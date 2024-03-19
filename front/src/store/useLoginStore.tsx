import { create } from "zustand";

const useLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: () => set(() => ({ isLogin: true}))
  // 로그인 로직에 따른 설정
  
}))