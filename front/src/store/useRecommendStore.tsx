import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface RecommendState {
  recom: boolean
  setRecom: (by: boolean) => void
}


const useRecommendStore = create<RecommendState>()(
  devtools((set) => ({
    recom: false,
    setRecom: () => set(() => ({ recom: true })),
  }))
);

export default useRecommendStore;
