import { atom } from "recoil";

export const layout = atom({
  key: 'layout',
  default: 'grid'
})

export const popUp = atom({
  key: 'popUpNoCart',
  default: 'none' // nw, yw, nc, yc
})

export const purchaseDone = atom({
  key: 'purchaseDone',
  default: false
});