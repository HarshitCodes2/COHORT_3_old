import { selector } from 'recoil'
import { cartItems } from './cartItemsState'
import { allItems } from './allItemsState';


export const totalItems = selector({
  key: 'totalItems',
  default: ({get}) => {
    const items = get(cartItems);
    let totalCount = 0;
    for(let item of items){
      totalCount += item.count;
    }
    return totalCount;
  }
})

export const totalPrice = selector({
  key: 'totalPrice',
  default: ({get}) => {
    const items = get(cartItems);
    const allItemsList = get(allItems);
    let totalPrice = 0;
    for (let item of items){
      let itemId = item.id;
      let itemInfo;
      let itemQty = item.count;
      itemInfo = allItemsList.find(i => i.id === itemId);
      totalPrice += (itemQty * itemInfo.price);
    }
    return totalPrice;
  }
});

