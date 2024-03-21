import { create } from "zustand";
import { devtools } from "zustand/middleware"

interface LoginState {
  isLogin: boolean
  setIsLogin: (by: boolean) => void
}

const useLoginStore = create<LoginState>()(devtools((set) => ({
  isLogin: false,
  setIsLogin: () => set(() => ({ isLogin: true}))
  
})))

export default useLoginStore;