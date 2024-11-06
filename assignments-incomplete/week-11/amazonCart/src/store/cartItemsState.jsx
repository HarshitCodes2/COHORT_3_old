import { useEffect, useRef } from 'react';
import { atom } from 'recoil';

export const cartItems = atom({
  key: 'cartItems',
  default: [],  // Will only store object of id of Items with qty.
});

export const usePrev = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value
  }, [value]);

  return ref.current;
}

export const itemDeleted = atom({
  key: "itemDeleted",
  default: false
});

