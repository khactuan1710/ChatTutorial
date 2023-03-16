import { create } from "zustand";
const CartStore = create((set) => ({
    count: 0,
    setCount: (count) => {set(count)},
    listPhone : 0,
    setListPhone: (listPhone) => set({listPhone})
}))
export default CartStore