import placeholderImg from "../assets/images/ImagePlaceholder.jpg";
import add from "../assets/icon/action/Add.svg";
import substract from "../assets/icon/action/Substract.svg";
import check from "../assets/icon/action/check.svg";
import deleteIcon from "../assets/icon/action/delete.svg";
import styles from "../css/cart.module.css";
import { cartItems, usePrev, itemDeleted } from "../store/cartItemsState";
import { allItems } from "../store/allItemsState";
import { purchaseDone } from "../store/behaviourState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";

function Cart() {
  const isPurchaseDone = useRecoilValue(purchaseDone);
  const isItemDeleted = useRecoilValue(itemDeleted);
  const cartItemList  = useRecoilValue(cartItems);
  const prevState = usePrev(cartItemList);

  return (
    <div className={styles.cartPage}>
      <CartContainer />
      <OrderSummary />
      {/* Condition for purchase*/}
      {isPurchaseDone ? <PurchaseConfirm /> : <></>}
      {isItemDeleted ? <Undo prevState={prevState}/> : <></>}
    </div>
  );
}

function OrderSummary() {
  const cartItemList = useRecoilValue(cartItems);
  const allItemsList = useRecoilValue(allItems);

  const mergedList = cartItemList.map((cartItem) => {
    const itemDetails = allItemsList.find((item) => item.id === cartItem.id);
    return {
      ...cartItem,
      ...itemDetails,
    };
  });

  let totalPrice = 0; 
  mergedList.map((item) => {
    totalPrice += item.count * item.price;
  })

  return (
    <div className={styles.orderSummary}>
      <h1 className={styles.orderSummaryHeading}>Order Summary</h1>
      <ItemCntDiv total={totalPrice}/>
      <hr className={styles.orderHr} />
      <OrderTotalDiv total={totalPrice}/>
      <OrderPurchase />
    </div>
  );
}

function ItemCntDiv(props) {
  const cartItemList = useRecoilValue(cartItems)

  return (
    <div className={styles.itemCntDiv}>
      <p className={styles.itemCnt}>Items ({cartItemList.length}):</p>
      <p className={styles.itemCntTotal}>₹ {props.total}</p>
    </div>
  );
}

function OrderTotalDiv(props) {
  return (
    <div className={styles.orderTotalDiv}>
      <p className={styles.orderTotal}>Order Total : </p>
      <p className={styles.orderTotalPrice}>₹ {props.total}</p>
    </div>
  );
}

function OrderPurchase() {
  const setPurchaseDone = useSetRecoilState(purchaseDone)

  function setPurchase(){
    setPurchaseDone(true);
  } 

  return <button onClick={() => {setPurchase()}} className={styles.checkoutBtn}>Proceed to Buy</button>;
}

function CartContainer() {
  const cartItemList = useRecoilValue(cartItems);
  const allItemsList = useRecoilValue(allItems);

  const mergedList = cartItemList.map((cartItem) => {
    const itemDetails = allItemsList.find((item) => item.id === cartItem.id);
    return {
      ...cartItem,
      ...itemDetails,
    };
  });
  // console.log(allItemsList);
  
  // console.log(cartItemList);
  

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartHeading}>Shopping Cart</h1>
      {
        mergedList.map((item, index) => (
          <ItemCard 
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            imgUrl={item.imgUrl}
            count={item.count}
          />
        ))
      }
    </div>
  );
}

function ItemCard(props) {
  const [cartItemList, setCartItem] = useRecoilState(cartItems);
  const [isDeleted, setIsDeleted] = useRecoilState(itemDeleted);

  function decreaseCount(id){
    if(props.count == 1) return;

    let newCartItemList = [...cartItemList];
    console.log(newCartItemList);
    
    let item = newCartItemList.find((item) => item.id === id);
    let index = newCartItemList.indexOf(item);
    
    newCartItemList[index] = {
      id: id,
      count: props.count - 1
    }

    setCartItem(newCartItemList);  
  }

  function increaseCount(id){
    let newCartItemList = [...cartItemList];
    console.log(newCartItemList);
    
    let item = newCartItemList.find((item) => item.id === id);
    let index = newCartItemList.indexOf(item);

    newCartItemList[index] = {
      id: id,
      count: props.count + 1
    }

    setCartItem(newCartItemList);    
  }

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSetIsDeleted = useCallback(debounce(() => setIsDeleted(false), 2000), []);

  function renderUndo(){
    setIsDeleted(true);
    debouncedSetIsDeleted();
  }

  function deleteItem(id){
    let newCartItemList = [...cartItemList];
    newCartItemList = newCartItemList.filter((item) => (item.id !== id));
    
    setCartItem(newCartItemList);
    // usePrev here
    renderUndo();
  }

  return (
    <div className={styles.itemCard}>
      <div className={styles.itemInfoCard}>
        <div className={styles.itemWrapper}>
          <img className={styles.itemImg} src={props.imgUrl == "" ? placeholderImg : props.imgUrl} />
          <div className={styles.itemInfo}>
            <h3 className={styles.itemName}>{props.name}</h3>
            <p className={styles.itemAvailability}>In Stock</p>
            <div className={styles.quantityAdjuster}>
              <button onClick={() => decreaseCount(props.id)} className={styles.qtyBtn}>
                <img className={styles.icons} src={substract} />
              </button>
              <p className={styles.qtyNum}>{props.count}</p>
              <button onClick={() => increaseCount(props.id)} className={styles.qtyBtn}>
                <img className={styles.icons} src={add} />
              </button>
              <button onClick={() => deleteItem(props.id)} className={styles.deleteBtn}>
                Delete <img className={styles.deleteIcon} src={deleteIcon} />
              </button>
            </div>
          </div>
        </div>
        <h2 className={styles.price}>₹ {props.price}</h2>
      </div>
      <hr className={styles.itemHr} />
    </div>
  );
}

function PurchaseConfirm() {
  const setPurchaseDone = useSetRecoilState(purchaseDone)
  const setCartItem = useSetRecoilState(cartItems)

  const cartItemList = useRecoilValue(cartItems);
  const allItemsList = useRecoilValue(allItems);

  const mergedList = cartItemList.map((cartItem) => {
    const itemDetails = allItemsList.find((item) => item.id === cartItem.id);
    return {
      ...cartItem,
      ...itemDetails,
    };
  });

  let totalPrice = 0; 
  mergedList.map((item) => {
    totalPrice += item.count * item.price;
  })

  function clearCart(){
    setCartItem([]);
    setPurchaseDone(false);
  } 

  return (
    <div className={styles.shadow}>
      <div className={styles.purchaseConfirm}>
        <h1>Purchase Successful</h1>
        <img src={check} className={styles.checkIcon} />
        <p className={styles.message}>
          Thank you for the purchase. Your order has been processed
          successfully.
        </p>
        <h3 className={styles.total}>Total amount : ₹{totalPrice}</h3>
        <button onClick={() => (clearCart())} className={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
}

function Undo(props){
  const setCartItem = useSetRecoilState(cartItems);

  function restoreItem(){
    if(props.prevState){
      console.log(props.prevState);
      setCartItem(props.prevState);
    }
  }

  return (
    <div className={styles.undoMsg}>
      <p className={styles.message}>Item deleted <button onClick={() => (restoreItem())} className={styles.link}>undo</button></p>
    </div>
  )
}

export default Cart;
