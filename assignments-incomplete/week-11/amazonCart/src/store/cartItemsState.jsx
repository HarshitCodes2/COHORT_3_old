import { atom } from 'recoil';

export const cartItems = atom({
  key: 'cartItems',
  default: [
    {
      id: 9,
      count: 1
    },
    {
      id: 8,
      count: 12
    },
    {
      id: 7,
      count: 2
    },
    {
      id: 6,
      count: 1
    }
  ],  // Will only store object of id of Items with qty.
  effects: [
    ({onSet}) => {
      onSet((id) => {
        console.log(id);
      });
    },
  ],
});

