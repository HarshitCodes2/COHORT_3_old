import { atom } from 'recoil';

export const cartItems = atom({
  key: 'cartItems',
  default: [9, 8, 7, 6],  // Will only store object of id of Items with qty.
  effects: [
    ({onSet}) => {
      onSet((id) => {
        console.log("Current user ID: " + id);
      });
    },
  ],
});

