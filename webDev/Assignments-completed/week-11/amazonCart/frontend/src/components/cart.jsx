import placeholderImg from "../assets/images/ImagePlaceholder.jpg";
import add from "../assets/icon/action/Add.svg";
import substract from "../assets/icon/action/Substract.svg";
import check from "../assets/icon/action/check.svg";
import cross from "../assets/icon/action/cross.svg";
import deleteIcon from "../assets/icon/action/delete.svg";
import styles from "../css/cart.module.css";
import { cartBadge } from "../store/behaviourState";
import { cartItems, usePrev, itemDeleted } from "../store/cartItemsState";
import { allItems } from "../store/allItemsState";
import { purchaseDone, purchaseFailed } from "../store/behaviourState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback, useEffect } from "react";
import axios from "axios";

function Cart() {
  const isPurchaseDone = useRecoilValue(purchaseDone);
  const isPurchaseFailed = useRecoilValue(purchaseFailed);
  const isItemDeleted = useRecoilValue(itemDeleted);
  const cartItemList = useRecoilValue(cartItems);
  const prevState = usePrev(cartItemList);
  const setCartItems = useSetRecoilState(cartItems);
  const setAllItems = useSetRecoilState(allItems);

  const authToken = localStorage.getItem("Authorization");
  useEffect(() => {
    async function fetchCartItems() {
      try {
        // console.log("authToken : " + authToken);
        const res = await axios.get("http://localhost:3001/cart", {
          headers: {
            Authorization: authToken,
          },
        });
        const cart = res.data.cart;
        setCartItems(cart);
        // console.log("cart : ");
        // console.log(cart[0].item);
      } catch (e) {
        console.log(e);
      }
    }
    fetchCartItems();
    async function fetchItems() {
      try {
        // console.log("authToken : " + authToken);
        const res = await axios.get("http://localhost:3001/items/allItems", {
          headers: {
            Authorization: authToken,
          },
        });
        const items = res.data.items;
        setAllItems(items);
      } catch (e) {
        console.log(e);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className={styles.cartPage}>
      <CartContainer />
      <OrderSummary />
      {/* Condition for purchase */}
      {isPurchaseDone ? <PurchaseConfirm /> : <></>}
      {isPurchaseFailed ? <PurchaseFailed /> : <></>}
      {isItemDeleted ? <Undo prevState={prevState} /> : <></>}
    </div>
  );
}

function OrderSummary() {
  const cartItemList = useRecoilValue(cartItems);
  const allItemsList = useRecoilValue(allItems);

  // console.log("allItemsList");
  // console.dir(allItemsList);

  const mergedList = cartItemList.map((cartItem) => {
    const itemDetails = allItemsList.find(
      (item) => item._id.toString() === cartItem.item.toString()
    );
    return {
      ...cartItem,
      ...itemDetails,
    };
  });

  // console.log("mergedList");
  // console.dir(mergedList);

  let totalPrice = 0;
  mergedList.map((item) => {
    totalPrice += item.count * item.price;
  });

  return (
    <div className={styles.orderSummary}>
      <h1 className={styles.orderSummaryHeading}>Order Summary</h1>
      <ItemCntDiv total={totalPrice} />
      <hr className={styles.orderHr} />
      <OrderTotalDiv total={totalPrice} />
      <OrderPurchase />
    </div>
  );
}

function ItemCntDiv(props) {
  const cartItemList = useRecoilValue(cartItems);

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
  const setPurchaseDone = useSetRecoilState(purchaseDone);
  const setPurchaseFailed = useSetRecoilState(purchaseFailed);

  async function startPurchase() {
    const authToken = localStorage.getItem("Authorization");
    try {
      const res = await axios.get("http://localhost:3001/cart/purchase", {
        headers: {
          Authorization: authToken,
        },
      });

      const purchaseStatus = res.data.status;

      console.log(purchaseStatus);
      

      if (purchaseStatus) {
        setPurchaseDone(true);
      }
    } catch (e) {
      console.log(e);
      setPurchaseFailed(true);
    }
  }

  return (
    <button
      onClick={() => {
        startPurchase();
      }}
      className={styles.checkoutBtn}
    >
      Proceed to Buy
    </button>
  );
}

function CartContainer() {
  const cartItemList = useRecoilValue(cartItems);
  const allItemsList = useRecoilValue(allItems);

  // console.log(cartItemList);

  const mergedList = cartItemList.map((cartItem) => {
    const itemDetails = allItemsList.find(
      (item) => item._id.toString() === cartItem.item.toString()
    );
    return {
      ...cartItem,
      ...itemDetails,
    };
  });

  // console.log("mergedList");
  // console.dir(mergedList);

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartHeading}>Shopping Cart</h1>
      {mergedList.map((item, index) => (
        <ItemCard
          key={index}
          id={item.item}
          name={item.name}
          price={item.price}
          imgUrl={item.imgUrl}
          count={item.count}
          quantity={item.quantity}
        />
      ))}
    </div>
  );
}

function ItemCard(props) {
  const [cartItemList, setCartItem] = useRecoilState(cartItems);
  const [isDeleted, setIsDeleted] = useRecoilState(itemDeleted);
  const setCartBadgeNo = useSetRecoilState(cartBadge);

  async function decreaseCount(id) {
    if (props.count == 1) return;

    let newCartItemList;
    const authToken = localStorage.getItem("Authorization");
    try {
      const res = await axios.post(
        "http://localhost:3001/cart/decreaseCount",
        {
          itemId: id,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      newCartItemList = res.data.cart;
      // console.log(newCartItemList);

      setCartItem(newCartItemList);
    } catch (e) {
      console.log(e);
    }
  }

  async function increaseCount(id) {
    let newCartItemList;

    const authToken = localStorage.getItem("Authorization");
    try {
      const res = await axios.post(
        "http://localhost:3001/cart/increaseCount",
        {
          itemId: id,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      newCartItemList = res.data.cart;
      // console.log(newCartItemList);

      setCartItem(newCartItemList);
    } catch (e) {
      console.log(e);
    }
  }

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSetIsDeleted = useCallback(
    debounce(() => setIsDeleted(false), 2000),
    []
  );

  function renderUndo() {
    setIsDeleted(true);
    debouncedSetIsDeleted();
  }

  async function deleteItem(id) {
    const authToken = localStorage.getItem("Authorization");

    try {
      const res = await axios.post(
        "http://localhost:3001/cart/delete",
        {
          itemId: id,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      const updatedCart = res.data.cart;

      setCartBadgeNo(updatedCart.length);
      setCartItem(updatedCart);
    } catch (e) {
      console.log(e);
    }

    renderUndo();
  }

  return (
    <div className={styles.itemCard}>
      <div className={styles.itemInfoCard}>
        <div className={styles.itemWrapper}>
          <img
            className={styles.itemImg}
            src={props.imgUrl == "" ? placeholderImg : props.imgUrl}
          />
          <div className={styles.itemInfo}>
            <h3 className={styles.itemName}>{props.name}</h3>
            <p
              className={`${styles.itemAvailability} text-sm ${
                props.quantity ? "text-green-600" : "text-red-600"
              }`}
            >
              In Stock : <span>{props.quantity}</span>
            </p>
            <div className={styles.quantityAdjuster}>
              <button
                onClick={() => decreaseCount(props.id)}
                className={styles.qtyBtn}
              >
                <img className={styles.icons} src={substract} />
              </button>
              <p className={styles.qtyNum}>{props.count}</p>
              <button
                onClick={() => increaseCount(props.id)}
                className={styles.qtyBtn}
              >
                <img className={styles.icons} src={add} />
              </button>
              <button
                onClick={() => deleteItem(props.id)}
                className={styles.deleteBtn}
              >
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

// Purchase done screen
function PurchaseConfirm() {
  const setPurchaseDone = useSetRecoilState(purchaseDone);
  const setCartItems = useSetRecoilState(cartItems);
  const setCartBadgeNo = useSetRecoilState(cartBadge);

  const cartItemList = useRecoilValue(cartItems);
  const allItemsList = useRecoilValue(allItems);

  const mergedList = cartItemList.map((cartItem) => {
    const itemDetails = allItemsList.find((item) => item._id.toString() === cartItem.item.toString());
    return {
      ...cartItem,
      ...itemDetails,
    };
  });

  let totalPrice = 0;
  mergedList.map((item) => {
    totalPrice += item.count * item.price;
  });

  async function clearCart() {
    const authToken = localStorage.getItem("Authorization");

    try {
      const res = await axios.post(
        "http://localhost:3001/cart/clear",
        {},
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      // console.log(res);

      setCartItems([]);
      setCartBadgeNo(0);
      setPurchaseDone(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.shadow}>
      <div className={styles.purchaseConfirm}>
        <h1 className="text-2xl text-center">Purchase Successful</h1>
        <img src={check} className={styles.checkIcon} />
        <p className={styles.message}>
          Thank you for the purchase. Your order has been processed
          successfully.
        </p>
        <h3 className={styles.total}>Total amount : ₹{totalPrice}</h3>
        <button onClick={() => clearCart()} className={styles.closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}

function PurchaseFailed(){
  const setPurchaseFailed = useSetRecoilState(purchaseFailed);

  function resetPurchase() {
    setPurchaseFailed(false);
  }

  return (
    <div className={styles.shadow}>
      <div className={styles.purchaseConfirm}>
        <h1 className="text-2xl text-center">Purchase Failed</h1>
        <img src={cross} className={styles.checkIcon} />
        <p className={styles.message}>
          Please update item quantity according to the stock
        </p>
        <button onClick={() => resetPurchase()} className={`${styles.closeBtn} bg-red-400 `}>
          Close
        </button>
      </div>
    </div>
  )
}

function Undo(props) {
  const setCartItem = useSetRecoilState(cartItems);
  const setCartBadgeNo = useSetRecoilState(cartBadge);

  async function restoreItem() {
    if (props.prevState) {
      // console.log(props.prevState);

      const prevCart = props.prevState;

      const authToken = localStorage.getItem("Authorization");
      try {
        const res = await axios.post(
          "http://localhost:3001/cart/restore",
          {
            oldCart: prevCart,
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        const newCartItemList = res.data.cart;
        console.log(newCartItemList.length);

        setCartBadgeNo(newCartItemList.length);
        setCartItem(newCartItemList);
      } catch (e) {
        console.log(e);
      }

      setCartItem(props.prevState);
    }
  }

  return (
    <div className={styles.undoMsg}>
      <p className={styles.message}>
        Item deleted{" "}
        <button onClick={() => restoreItem()} className={styles.link}>
          undo
        </button>
      </p>
    </div>
  );
}

export default Cart;
