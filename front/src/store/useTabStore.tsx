import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware"

interface TabState {
  tabIndex: number
  setTabIndex: (by: number) => void
}

const useTabStore = create<TabState>()(
  persist(
  devtools((set) => ({
  tabIndex: 0,
  setTabIndex: (tabIndex) => set(() => ({ tabIndex : tabIndex}))
  
})),
{
  name : 'tab-state',
  storage : createJSONStorage(() => sessionStorage)
}

))

export default useTabStore;