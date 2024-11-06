import gridIcon from "../assets/icon/action/grid.svg";
import listIcon from "../assets/icon/action/list.svg";
import styles from "../css/allitems.module.css";
import placeholderImg from "../assets/images/ImagePlaceholder.jpg";
import { layout, popUp } from "../store/behaviourState";
import { allItems } from "../store/allItemsState";
import { wishlistItems } from "../store/wishListItemsState";
import { cartItems } from "../store/cartItemsState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Items() {
  const showPopup = useRecoilValue(popUp);
  return (
    <div className={styles.itemContainer}>
      {showPopup ? <PopUp /> : <></>}
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
  const setLayout = useSetRecoilState(layout);

  return (
    <div className={styles.header}>
      <h1 className={styles.heading}>All items at our shop</h1>
      <p className={styles.subHeading}>
        Your one stop shop to fulfill all your needs.
      </p>
      <div className={styles.layoutBtns}>
        <button onClick={() => setLayout("grid")} className={styles.iconBtns}>
          <img src={gridIcon} />
        </button>
        <button onClick={() => setLayout("list")} className={styles.iconBtns}>
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

  const debouncedSetPopUp = debounce(() => setPopUp(false), 2000);

  function addToWishlist(id) {
    const alreadyExist = wishlistItemList.find((item) => item === id);

    if (alreadyExist) {
      console.log("Already in Wish List");
      setPopUp(true);
      debouncedSetPopUp();
    } else {
      setPopUp(false);
      console.log(id + " added to  wishlist");
      setWishlistItems([...wishlistItemList, id]);
    }
  }

  function addToCart(id) {
    const alreadyExist = cartItemList.find((item) => item.id == id);
    console.log(alreadyExist);

    if (alreadyExist) {
      // const index = parseInt(cartItemList.indexOf(alreadyExist));
      // console.log(index);
      // let newList = [...cartItemList];
      // let newItem = { ...alreadyExist };
      // newList.splice(index, 1);
      // newItem.count += 1;
      // newList = [...newList, newItem];
      // console.log("Inc : " + newItem);

      // setCartItems(newList);
      setPopUp(true);
      debouncedSetPopUp();
    } else {
      setCartItems([...cartItemList, { id: id, count: 1 }]);
    }
  }

  return (
    <div className={styles.gridItemCard}>
      <div className={styles.itemInfoGrid}>
        <img src={props.imgUrl} className={styles.itemImg} />
        <p className={styles.itemName}>{props.name}</p>
        <p className={styles.itemPrice}>₹ {props.price}</p>
      </div>
      <div className={styles.btnDivGrid}>
        <button onClick={() => addToCart(props.id)} className={styles.cardBtn}>
          Add to cart
        </button>
        <button
          onClick={() => addToWishlist(props.id)}
          className={styles.cardBtn}
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

  const debouncedSetPopUp = debounce(() => setPopUp(false), 2000);

  function addToWishlist(id) {
    const alreadyExist = wishlistItemList.find((item) => item == id);

    if (alreadyExist) {
      // console.log("Already in Wish List");
      setPopUp(true);
      debouncedSetPopUp();
    } else {
      // console.log(id + " added to  wishlist");
      setWishlistItems([...wishlistItemList, id]);
    }
  }

  function addToCart(id) {
    const alreadyExist = cartItemList.find((item) => item.id == id);
    console.log(alreadyExist);

    if (alreadyExist) {
      // const index = parseInt(cartItemList.indexOf(alreadyExist));
      // console.log(index);
      // let newList = [...cartItemList];
      // let newItem = { ...alreadyExist };
      // newList.splice(index, 1);
      // newItem.count += 1;
      // newList = [...newList, newItem];
      // console.log("Inc : " + newItem);
      // setCartItems(newList);
      setPopUp(true);
      debouncedSetPopUp();
    } else {
      setCartItems([...cartItemList, { id: id, count: 1 }]);
    }
  }

  return (
    <div className={styles.listItemCard}>
      <img src={props.imgUrl} className={styles.itemImg} />
      <div className={styles.itemInfoList}>
        <p className={styles.itemName}>{props.name}</p>
        <p className={styles.itemPrice}>{props.price}</p>
        <div className={styles.btnDivList}>
          <button
            onClick={() => addToCart(props.id)}
            className={styles.cardBtn}
          >
            Add to cart
          </button>
          <button
            onClick={() => addToWishlist(props.id)}
            className={styles.cardBtn}
          >
            Add to wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

function PopUp() {
  return (
    <div id="popUp" className={styles.popupDiv}>
      <p className={styles.popupMsg}>Already in Wishlist or Cart</p>
    </div>
  );
}

export default Items;
