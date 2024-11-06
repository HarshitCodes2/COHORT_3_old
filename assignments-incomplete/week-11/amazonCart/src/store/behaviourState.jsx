import { atom } from "recoil";

export const layout = atom({
  key: 'layout',
  default: 'grid'
})

export const popUp = atom({
  key: 'popUp',
  default: false
})

export const purchaseDone = atom({
  key: 'purchaseDone',
  default: false
});