import { create } from "zustand";

interface InquiryState {
  email: string;
  setEmail: (by: string) => void;
}

const useInquiryStore = create<InquiryState>((set, get) => ({
  email: "",
  setEmail: (by: string) => set({ email: by }),
}));

export default useInquiryStore;
