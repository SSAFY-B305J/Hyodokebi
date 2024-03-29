import { create } from "zustand";
import { getDuplicateCheck } from "../apis/api/member";

interface InquiryState {
  email: string;
  setEmail: (by: string) => void;
  getIsEmailExist: () => Promise<boolean>;
}

const useInquiryStore = create<InquiryState>((set, get) => ({
  email: "",
  setEmail: (by: string) => set({ email: by }),

  // 존재하는 이메일이면 true를 반환
  getIsEmailExist: async () => {
    // TODO: API 완성되면 코드 교체
    // const isExist = await getDuplicateCheck("email", get().email);
    // return isExist;
    return true;
  },
}));

export default useInquiryStore;
