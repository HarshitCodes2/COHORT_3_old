import { atom } from "recoil";

export const inputRefs = atom({
  key: "inputRefs",
  default: []
})

export const otpValidity = atom({
  key: "otpValidity",
  default: false
});
