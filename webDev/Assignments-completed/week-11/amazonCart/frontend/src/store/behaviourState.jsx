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

export const purchaseFailed = atom({
  key: 'purchaseFailed',
  default: false
});

export const userFname = atom({
  key: 'userFname',
  default: 'User'
})

export const wishlistBadge = atom({
  key: 'wishlistBadge',
  default: 0
});

export const cartBadge = atom({
  key: 'cartBadge',
  default: 0
});
