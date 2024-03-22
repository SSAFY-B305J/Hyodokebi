import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface RecommendState {
  recom: boolean
  setRecom: (by: boolean) => void
}


const useRecommendStore = create<RecommendState>()(
  persist(
  devtools((set) => ({
    recom: false,
    setRecom: () => set(() => ({ recom: true })),
  }))
, 
{
  name : 'recommend-state',
  storage : createJSONStorage(() => sessionStorage)
}
));

export default useRecommendStore;
