import { create } from "zustand";

const homeStore = create((set) => ({
    count: 0,
    setCount: (count) => set({count}),
}))
export default homeStore