import imgPlaceholder from "../assets/images/ImagePlaceholder.jpg";
import add from "../assets/icon/action/Add.svg";
import substract from "../assets/icon/action/Substract.svg";
import check from "../assets/icon/action/check.svg";
import deleteIcon from "../assets/icon/action/delete.svg";
import styles from "../css/cart.module.css";
import { useState } from "react";

function Cart() {
  const [cond1, setCond1] = useState(false);
  return (
    <div className={styles.cartPage}>
      <CartContainer />
      <OrderSummary />
      {/* Condition for purchase*/}
      {
        cond1 ?
        <PurchaseConfirm />
        :
        <></>
      }
    </div>
  );
}

function OrderSummary() {
  return (
    <div className={styles.orderSummary}>
      <h1 className={styles.orderSummaryHeading}>Order Summary</h1>
      <ItemCntDiv />
      <hr className={styles.orderHr} />
      <OrderTotalDiv />
      <OrderPurchase />
    </div>
  );
}

function ItemCntDiv() {
  return (
    <div className={styles.itemCntDiv}>
      <p className={styles.itemCnt}>Items (2):</p>
      <p className={styles.itemCntTotal}>₹1234</p>
    </div>
  );
}

function OrderTotalDiv() {
  return (
    <div className={styles.orderTotalDiv}>
      <p className={styles.orderTotal}>Order Total : </p>
      <p className={styles.orderTotalPrice}>₹1234</p>
    </div>
  );
}

function OrderPurchase() {
  return <button className={styles.checkoutBtn}>Proceed to Buy</button>;
}

function CartContainer() {
  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartHeading}>Shopping Cart</h1>
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </div>
  );
}

function ItemCard() {
  return (
    <div className={styles.itemCard}>
      <ItemInfoCard />
      <hr className={styles.itemHr} />
    </div>
  );
}

function ItemInfoCard() {
  return (
    <div className={styles.itemInfoCard}>
      <div className={styles.itemWrapper}>
        <img className={styles.itemImg} src={imgPlaceholder} />
        <div className={styles.itemInfo}>
          <h3 className={styles.itemName}>Item Name</h3>
          <p className={styles.itemAvailability}>In Stock</p>
          <div className={styles.quantityAdjuster}>
            <button className={styles.qtyBtn}>
              <img className={styles.icons} src={substract} />
            </button>
            <p className={styles.qtyNum}>12</p>
            <button className={styles.qtyBtn}>
              <img className={styles.icons} src={add} />
            </button>
            <button className={styles.deleteBtn}>Delete <img className={styles.deleteIcon} src={deleteIcon} /></button>
          </div>
        </div>
      </div>
      <h2 className={styles.price}>₹1234</h2>
    </div>
  );
}

function PurchaseConfirm() {
  return (
    <div className={styles.shadow}>
      <div className={styles.purchaseConfirm}>
        <h1>Purchase Successful</h1>
        <img src={check} className={styles.checkIcon} />
        <p className={styles.message}>Thank you for the purchase. Your order has been processed successfully.</p>
        <h3 className={styles.total}>Total amount : ₹1234</h3>
        <button className={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
}

export default Cart;
