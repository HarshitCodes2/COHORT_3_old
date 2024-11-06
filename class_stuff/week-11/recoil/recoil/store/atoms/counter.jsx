import { atom, selector } from 'recoil'

export const counterAtom = atom({
  key:"count",
  default:0
})

export const evenSelector = selector({
  key: "isEvenSelector",
  get: function ( { get }){
    const currentVal = get(counterAtom);
    const isEven = (currentVal % 2 == 0);
    return isEven;
  }
})
