import allItemsLogo from "../assets/icon/action/allItems.svg";
import wishlistLogo from "../assets/icon/action/wishlist.svg";
import cartLogo from "../assets/icon/action/cart.svg";
import styles from "../css/navbar.module.css";
import { Link } from "react-router-dom";
import { cartItems } from "../store/cartItemsState";
import { wishlistItems } from "../store/wishListItemsState";
import { RecoilRoot, useRecoilValue } from "recoil";

function NavBar() {
  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.items}>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <button className={styles.mainLogo}>amazon.in</button>
          </Link>
          <Logos />
        </div>
      </div>
    </>
  );
}

function Logos() {
  const cartList = useRecoilValue(cartItems);
  const wishlistList = useRecoilValue(wishlistItems);

  const cartBadge = cartList.length;
  const wishlistBadge = wishlistList.length;

  console.log(cartBadge);

  return (
    <div className={styles.logoContainer}>
      <p className={styles.greeting}>Hello, User</p>
      <button className={styles.logoBtn}>
        <Link style={{ textDecoration: "none" }} to={"/"}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src={allItemsLogo} />
          </div>
        </Link>
      </button>
      <button className={styles.logoBtn}>
        <Link style={{ textDecoration: "none" }} to={"/wishlist"}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src={wishlistLogo} />
            {wishlistBadge > 0 ? (
              <div className={styles.logoCount}>
                {wishlistBadge > 9 ? "9+" : wishlistBadge}
              </div>
            ) : null}
          </div>
        </Link>
      </button>
      <button className={styles.logoBtn}>
        <Link style={{ textDecoration: "none" }} to={"/cart"}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src={cartLogo} />
            {cartBadge > 0 ? (
              <div className={styles.logoCount}>
                {cartBadge > 9 ? "9+" : cartBadge}
              </div>
            ) : null}
          </div>
        </Link>
      </button>
    </div>
  );
}

export default NavBar;
