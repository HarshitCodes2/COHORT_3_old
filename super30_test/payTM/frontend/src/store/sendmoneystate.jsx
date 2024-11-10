import { atom } from "recoil";


export const recieverUserId = atom({
  key: "recieverUserId",
  default: "",
  effects: [
    ({onSet}) => {
      onSet(newID => {
        console.debug("Current user ID:", newID);
      });
    },
  ],
});

export const recieverUserFullName = atom({
  key: "recieverUserFullName",
  default: ""
});

export const amount = atom({
  key: "amount",
  default: 0
});

