import allItemsLogo from "../assets/icon/action/allItems.svg";
import wishlistLogo from "../assets/icon/action/wishlist.svg";
import cartLogo from "../assets/icon/action/cart.svg";
import logOutLogo from "../assets/icon/action/logout.svg";
import styles from "../css/navbar.module.css";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userFname, wishlistBadge, cartBadge } from "../store/behaviourState";
import { useEffect } from "react";
import axios from "axios";

function NavBar() {
  const setUserFName = useSetRecoilState(userFname);

  const authToken = localStorage.getItem("Authorization")
  useEffect(() => {
    async function fetchuserName(){
    try{
      const res = await axios.get("http://localhost:3001/user/name", {
        headers: {
          Authorization: authToken
        }
      });

      const name = res.data.name[0].toUpperCase() + res.data.name.slice(1);
      setUserFName(name);
    }catch(e){
      console.log(e);
      
    }
  }
  fetchuserName();
  }, [])

  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.items}>
          <Link style={{ textDecoration: "none" }} to={"/items"}>
            <button className={styles.mainLogo}>
              amazon<span className="text-yellow-400">.in</span>
            </button>
          </Link>
          <Logos />
        </div>
      </div>
    </>
  );
}

function Logos() {
  const [wishlistBadgeNo, setWishlistBadgeNo] = useRecoilState(wishlistBadge);
  const [cartBadgeNo, setCartBadgeNo] = useRecoilState(cartBadge);

  let fName = useRecoilValue(userFname);

  fName = fName[0].toUpperCase() + fName.slice(1);

  const authToken = localStorage.getItem("Authorization");
  useEffect(() => {
    async function fetchCount() {
      // console.log("authToken : " + authToken);
      try {
        const wishlistRes = await axios.get(
          "http://localhost:3001/wishlist/itemcount",
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        setWishlistBadgeNo(wishlistRes.data.count);
      } catch (e) {
        console.log(e);
      }

      try {
        const cartRes = await axios.get(
          "http://localhost:3001/cart/itemcount",
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        setCartBadgeNo(cartRes.data.count);
      } catch (e) {
        console.log(e);
      }
    }
    fetchCount();
  }, []);

  return (
    <div className={styles.logoContainer}>
      <p className={styles.greeting}>Hello, {fName}</p>
      <button className={styles.logoBtn}>
        <Link style={{ textDecoration: "none" }} to={"/items"}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src={allItemsLogo} />
          </div>
        </Link>
      </button>
      <button className={styles.logoBtn}>
        <Link style={{ textDecoration: "none" }} to={"/wishlist"}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src={wishlistLogo} />
            {wishlistBadgeNo > 0 ? (
              <div className={styles.logoCount}>
                {wishlistBadgeNo > 9 ? "9+" : wishlistBadgeNo}
              </div>
            ) : null}
          </div>
        </Link>
      </button>
      <button className={styles.logoBtn}>
        <Link style={{ textDecoration: "none" }} to={"/cart"}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src={cartLogo} />
            {cartBadgeNo > 0 ? (
              <div className={styles.logoCount}>
                {cartBadgeNo > 9 ? "9+" : cartBadgeNo}
              </div>
            ) : null}
          </div>
        </Link>
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("Authorization");
        }}
        className={styles.logoBtn}
      >
        <Link style={{ textDecoration: "none" }} to={"/signin"}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src={logOutLogo} />
          </div>
        </Link>
      </button>
    </div>
  );
}

export default NavBar;
