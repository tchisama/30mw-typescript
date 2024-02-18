// zustand store for collections 
import { collType } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


type Collections = {
  collections: collType[] | null
  setCollections: (collections: collType[] | null) => void
}


export const useCollections = create<Collections>()(devtools((set) => ({
  collections: [],
  setCollections: (collections: collType[] | null) => set({ collections }),
})))