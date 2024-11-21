import { atom } from "recoil";


export const filter = atom({
  key: "filter",
  default: ""
});

export const users = atom({
  key: 'users',
  default: []
});

export const firstName = atom({
  key: 'firstName',
  default: "User"
});

export const balance = atom({
  key: 'balance',
  default: "XXXXX"
});

export const debounceduserArr = atom({
  key: "debounceduserArr",
  default: []
});
