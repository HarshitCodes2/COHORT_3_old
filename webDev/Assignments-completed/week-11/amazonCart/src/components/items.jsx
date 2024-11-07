import gridIcon from "../assets/icon/action/grid.svg";
import listIcon from "../assets/icon/action/list.svg";
import styles from "../css/allitems.module.css";
import placeholderImg from "../assets/images/ImagePlaceholder.jpg";
import { layout, popUp } from "../store/behaviourState";
import { allItems } from "../store/allItemsState";
import { wishlistItems } from "../store/wishListItemsState";
import { cartItems } from "../store/cartItemsState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";

function Items() {
  const popUpVal = useRecoilValue(popUp);

  const renderPopUp = () => {
    switch (popUpVal) {
      case 'nw':
        return <PopUpNoWishlist />;
      case 'yw':
        return <PopUpYesWishlist />;
      case 'nc':
        return <PopUpNoCart />;
      case 'yc':
        return <PopUpYesCart />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.itemContainer}>
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
      <h2>All Item</h2>
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
  {layoutValue == 'list' ? isListLayout = true : isListLayout = false}

  return (
    <div className={styles.header}>
      <h1 className={styles.heading}>All items at our shop</h1>
      <p className={styles.subHeading}>
        Your one stop shop to fulfill all your needs.
      </p>
      <div className={styles.layoutBtns}>
        <button onClick={() => setLayout("grid")} className={isListLayout ? styles.iconBtns : styles.activeIcons}>
          <img src={gridIcon} />
        </button>
        <button onClick={() => setLayout("list")} className={isListLayout ? styles.activeIcons : styles.iconBtns}>
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
          id={item.id}
          name={item.name}
          price={item.price}
          imgUrl={item.imgUrl}
        />
      ))}
    </div>
  );
}

function GridItemCard(props) {
  const [wishlistItemList, setWishlistItems] = useRecoilState(wishlistItems);
  const [cartItemList, setCartItems] = useRecoilState(cartItems);
  const setPopUp = useSetRecoilState(popUp);

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSetPopUp = useCallback(debounce(() => setPopUp("none"), 2000));


  function addToWishlist(id) {
    const alreadyExist = wishlistItemList.find((item) => item === id);

    if (alreadyExist) {
      console.log("Already in Wish List");
      setPopUp("nw");
      debouncedSetPopUp();
    } else {
      setPopUp("yw");
      debouncedSetPopUp();
      console.log(id + " added to  wishlist");
      setWishlistItems([...wishlistItemList, id]);
    }
  }

  function addToCart(id) {
    const alreadyExist = cartItemList.find((item) => item.id == id);
    console.log(alreadyExist);

    if (alreadyExist) {
      setPopUp("nc");
      debouncedSetPopUp();
    } else {
      setPopUp("yc");
      debouncedSetPopUp();
      setCartItems([...cartItemList, { id: id, count: 1 }]);
    }
  }

  return (
    <div className={styles.gridItemCard}>
      <div className={styles.itemInfoGrid}>
        <img src={props.imgUrl == "" ? placeholderImg : props.imgUrl} className={styles.itemImg} />
        <p className={styles.itemName}>{props.name}</p>
        <p className={styles.itemPrice}>₹ {props.price}</p>
      </div>
      <div className={styles.btnDivGrid}>
        <button onClick={() => addToCart(props.id)} className={styles.cardBtn}>
          Add to cart
        </button>
        <button onClick={() => addToWishlist(props.id)} className={styles.cardBtnTwo}>
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
          id={item.id}
          name={item.name}
          price={item.price}
          imgUrl={item.imgUrl}
        />
      ))}
    </div>
  );
}

function ListItemCard(props) {
  const [wishlistItemList, setWishlistItems] = useRecoilState(wishlistItems);
  const [cartItemList, setCartItems] = useRecoilState(cartItems);
  const setPopUp = useSetRecoilState(popUp);

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSetPopUp = useCallback(debounce(() => setPopUp("none"), 2000));


  function addToWishlist(id) {
    const alreadyExist = wishlistItemList.find((item) => item == id);

    if (alreadyExist) {
      setPopUp("nw");
      debouncedSetPopUp();
    } else {
      setPopUp("yw");
      debouncedSetPopUp();
      setWishlistItems([...wishlistItemList, id]);
    }
  }

  function addToCart(id) {
    const alreadyExist = cartItemList.find((item) => item.id == id);
    console.log(alreadyExist);

    if (alreadyExist) {
      setPopUp("nc");
      debouncedSetPopUp();
    } else {
      setPopUp("yc");
      debouncedSetPopUp();
      setCartItems([...cartItemList, { id: id, count: 1 }]);
    }
  }

  return (
    <div className={styles.listItemCard}>
      <img src={props.imgUrl == "" ? placeholderImg : props.imgUrl} className={styles.itemImg} />
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

function PopUpNoWishlist(){
  return (
    <div id="popUp" className={styles.popupnoDiv}>
      <p className={styles.popupMsg}>Already in Wishlist</p>
    </div>
  );
}

function PopUpYesCart(){
  return (
    <div id="popUp" className={styles.popupyesDiv}>
      <p className={styles.popupMsg}>Added to Cart</p>
    </div>
  );
}

function PopUpYesWishlist(){
  return (
    <div id="popUp" className={styles.popupyesDiv}>
      <p className={styles.popupMsg}>Added to Wishlist</p>
    </div>
  );
}
export default Items;
