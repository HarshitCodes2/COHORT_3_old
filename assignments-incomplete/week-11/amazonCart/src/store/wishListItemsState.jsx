import { atom } from 'recoil';

export const wishlistItems = atom({
  key: 'wishlistItems',
  default: [1, 2, 3, 4],  // Will only store id of Items
  effects: [
    ({onSet}) => {
      onSet((id) => {
        console.log("Current user ID: " + id);
      });
    },
  ],
});