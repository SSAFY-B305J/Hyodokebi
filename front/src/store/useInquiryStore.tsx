import { create } from "zustand";

interface InquiryState {
  id: string;
  email: string;
  setId: (by: string) => void;
  setEmail: (by: string) => void;
}

const useInquiryStore = create<InquiryState>((set) => ({
  id: "",
  email: "",
  setId: (by: string) => set({ id: by }),
  setEmail: (by: string) => set({ email: by }),
}));

export default useInquiryStore;
