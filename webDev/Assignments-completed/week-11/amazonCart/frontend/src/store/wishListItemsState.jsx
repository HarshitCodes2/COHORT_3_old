import { atom } from 'recoil';

export const wishlistItems = atom({
  key: 'wishlistItems',
  default: [],  // Will only store id of Items
  // effects: [
  //   ({onSet}) => {
  //     onSet((id) => {
  //       console.log("Current product ID: " + id);
  //     });
  //   },
  // ],
});
