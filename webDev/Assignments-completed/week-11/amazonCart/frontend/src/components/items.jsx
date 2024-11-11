import gridIcon from "../assets/icon/action/grid.svg";
import listIcon from "../assets/icon/action/list.svg";
import styles from "../css/allitems.module.css";
import placeholderImg from "../assets/images/ImagePlaceholder.jpg";
import { cartBadge, layout, popUp, wishlistBadge } from "../store/behaviourState";
import { allItems } from "../store/allItemsState";
import { wishlistItems } from "../store/wishListItemsState";
import { cartItems } from "../store/cartItemsState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback, useEffect } from "react";
import axios from "axios";

function Items() {
  const popUpVal = useRecoilValue(popUp);
  const setAllItems = useSetRecoilState(allItems);

  const authToken = localStorage.getItem("Authorization");
  useEffect(() => {
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

  const renderPopUp = () => {
    switch (popUpVal) {
      case "nw":
        return <PopUpNoWishlist />;
      case "yw":
        return <PopUpYesWishlist />;
      case "nc":
        return <PopUpNoCart />;
      case "yc":
        return <PopUpYesCart />;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.itemContainer}`}>
      {renderPopUp()}
      <SideBar />
      <MainContent />
    </div>
  );
}

function SideBar() {
  return (
    <div className={styles.sideBar}>
      <SideBarCard />
    </div>
  );
}

function SideBarCard() {
  return (
    <div className={styles.sideBarCard}>
      <h2 className="text-2xl">All Item</h2>
      <p>Yahi hai jo hai</p>
    </div>
  );
}

function MainContent() {
  const layoutValue = useRecoilValue(layout);

  return (
    <div className={styles.mainContentDiv}>
      <Header />
      {layoutValue == "list" ? (
        <AllItemsListContainer />
      ) : (
        <AllItemsGridContainer />
      )}
    </div>
  );
}

function Header() {
  const [layoutValue, setLayout] = useRecoilState(layout);

  let isListLayout;
  {
    layoutValue == "list" ? (isListLayout = true) : (isListLayout = false);
  }

  return (
    <div className={styles.header}>
      <h1 className="text-3xl">All items at our shop</h1>
      <p className={styles.subHeading}>
        Your one stop shop to fulfill all your needs.
      </p>
      <div className={styles.layoutBtns}>
        <button
          onClick={() => setLayout("grid")}
          className={isListLayout ? styles.iconBtns : styles.activeIcons}
        >
          <img src={gridIcon} />
        </button>
        <button
          onClick={() => setLayout("list")}
          className={isListLayout ? styles.activeIcons : styles.iconBtns}
        >
          <img src={listIcon} />
        </button>
      </div>
    </div>
  );
}

function AllItemsGridContainer() {
  const itemList = useRecoilValue(allItems);

  return (
    <div className={styles.itemGrid}>
      {itemList.map((item, index) => (
        <GridItemCard
          key={index}
          id={item._id}
          name={item.name}
          price={item.price}
          imgUrl={item.imgUrl}
        />
      ))}
    </div>
  );
}

function GridItemCard(props) {
  const setWishlistItems = useSetRecoilState(wishlistItems);
  const setCartItems = useSetRecoilState(cartItems);
  const setWishlistBadgeNo = useSetRecoilState(wishlistBadge);
  const setCartBadgeNo = useSetRecoilState(cartBadge);
  const setPopUp = useSetRecoilState(popUp);

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSetPopUp = useCallback(debounce(() => setPopUp("none"), 2000));

  async function addToWishlist(id) {
    try {
      const res = await axios.post(
        "http://localhost:3001/wishlist/additem",
        {
          itemId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );

      console.log(res.data.wishlist);
      setWishlistItems(res.data.wishlist);

      setWishlistBadgeNo(res.data.wishlist.length);

      setPopUp("yw");
      debouncedSetPopUp();
    } catch (e) {
      console.log(e);

      setPopUp("nw");
      debouncedSetPopUp();
    }
  }

  async function addToCart(id) {
    try {
      const res = await axios.post(
        "http://localhost:3001/cart/additem",
        {
          itemId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );

      console.log(res.data.cart);
      setCartItems(res.data.cart);

      setCartBadgeNo(res.data.cart.length);

      setPopUp("yc");
      debouncedSetPopUp();
    } catch (e) {
      console.log(e);

      setPopUp("nc");
      debouncedSetPopUp();
    }
  }

  return (
    <div className={styles.gridItemCard}>
      <div className={styles.itemInfoGrid}>
        <img
          src={props.imgUrl == "" ? placeholderImg : props.imgUrl}
          className={styles.itemImg}
        />
        <p className={styles.itemName}>{props.name}</p>
        <p className={styles.itemPrice}>₹ {props.price}</p>
      </div>
      <div className={styles.btnDivGrid}>
        <button onClick={() => addToCart(props.id)} className={styles.cardBtn}>
          Add to cart
        </button>
        <button
          onClick={() => addToWishlist(props.id)}
          className={styles.cardBtnTwo}
        >
          Add to wishlist
        </button>
      </div>
    </div>
  );
}

function AllItemsListContainer() {
  const itemList = useRecoilValue(allItems);

  return (
    <div className={styles.itemList}>
      {itemList.map((item, index) => (
        <ListItemCard
          key={index}
          id={item._id}
          name={item.name}
          price={item.price}
          imgUrl={item.imgUrl}
        />
      ))}
    </div>
  );
}

function ListItemCard(props) {
  const setWishlistItems = useSetRecoilState(wishlistItems);
  const setCartItems = useSetRecoilState(cartItems);
  const setWishlistBadgeNo = useSetRecoilState(wishlistBadge);
  const setCartBadgeNo = useSetRecoilState(cartBadge);
  const setPopUp = useSetRecoilState(popUp);

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSetPopUp = useCallback(debounce(() => setPopUp("none"), 2000));

  async function addToWishlist(id) {
    try {
      const res = await axios.post(
        "http://localhost:3001/wishlist/additem",
        {
          itemId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );

      console.log(res.data.wishlist);
      setWishlistItems(res.data.wishlist);

      setWishlistBadgeNo(res.data.wishlist.length);

      setPopUp("yw");
      debouncedSetPopUp();
    } catch (e) {
      console.log(e);

      setPopUp("nw");
      debouncedSetPopUp();
    }
  }

  async function addToCart(id) {
    try {
      const res = await axios.post(
        "http://localhost:3001/cart/additem",
        {
          itemId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );

      console.log(res.data.cart);
      setCartItems(res.data.cart);

      setCartBadgeNo(res.data.cart.length);

      setPopUp("yc");
      debouncedSetPopUp();
    } catch (e) {
      console.log(e);

      setPopUp("nc");
      debouncedSetPopUp();
    }
  }

  return (
    <div className={styles.listItemCard}>
      <img
        src={props.imgUrl == "" ? placeholderImg : props.imgUrl}
        className={styles.itemImg}
      />
      <div className={styles.itemInfoList}>
        <p className={styles.itemName}>{props.name}</p>
        <p className={styles.itemPrice}>₹ {props.price}</p>
        <div className={styles.btnDivList}>
          <button
            onClick={() => addToCart(props.id)}
            className={styles.cardBtn}
          >
            Add to cart
          </button>
          <button
            onClick={() => addToWishlist(props.id)}
            className={styles.cardBtnTwo}
          >
            Add to wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

function PopUpNoCart() {
  return (
    <div id="popUp" className={styles.popupnoDiv}>
      <p className={styles.popupMsg}>Already in Cart</p>
    </div>
  );
}

function PopUpNoWishlist() {
  return (
    <div id="popUp" className={styles.popupnoDiv}>
      <p className={styles.popupMsg}>Already in Wishlist</p>
    </div>
  );
}

function PopUpYesCart() {
  return (
    <div id="popUp" className={styles.popupyesDiv}>
      <p className={styles.popupMsg}>Added to Cart</p>
    </div>
  );
}

function PopUpYesWishlist() {
  return (
    <div id="popUp" className={styles.popupyesDiv}>
      <p className={styles.popupMsg}>Added to Wishlist</p>
    </div>
  );
}

export default Items;
