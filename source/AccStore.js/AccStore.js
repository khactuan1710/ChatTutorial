import { create } from "zustand";
const AccStore = create((set) => ({
    count: 5,
    setCount: (count) => set({count})
}))
export default AccStore