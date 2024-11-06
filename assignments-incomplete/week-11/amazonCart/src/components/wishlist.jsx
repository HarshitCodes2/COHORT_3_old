import gridIcon from "../assets/icon/action/grid.svg";
import listIcon from "../assets/icon/action/list.svg";
import styles from "../css/wishlist.module.css";
import placeholderImg from "../assets/images/ImagePlaceholder.jpg";
import { layout, popUp } from "../store/behaviourState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { wishlistItems } from "../store/wishListItemsState";
import { allItems } from "../store/allItemsState";
import { cartItems } from "../store/cartItemsState";

function WishListItems() {
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
      <h2>Your wishlist</h2>
      <p>Wahh! kya pasand hai</p>
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
      <h1 className={styles.heading}>Your Wishlist</h1>
      <p className={styles.subHeading}>The choice is aapki</p>
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
  const wishlistItemIds = useRecoilValue(wishlistItems);
  const allItemsList = useRecoilValue(allItems);

  const wishlistDetails = wishlistItemIds.map(id => allItemsList.find(item => item.id === id));
  
  return (
    <div className={styles.itemGrid}>
      {wishlistDetails.map((item, index) => (
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

  function removeFromWishlist(id) {
    setWishlistItems(wishlistItemList.filter(itemId => itemId !== id));
  }

  function addToCart(id){
    const alreadyExist = cartItemList.find((item) => item.id == id);
    console.log(alreadyExist);
    
    if (alreadyExist) {
      setPopUp(true);
      debouncedSetPopUp();
    } else {
      removeFromWishlist(id);
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
        <button onClick={() => {addToCart(props.id)}} className={styles.cardBtn}>Add to cart</button>
        <button onClick={() => {removeFromWishlist(props.id)}} className={styles.cardBtn}>Remove from wishlist</button>
      </div>
    </div>
  );
}

function AllItemsListContainer() {
  const wishlistItemIds = useRecoilValue(wishlistItems);
  const allItemsList = useRecoilValue(allItems);

  const wishlistDetails = wishlistItemIds.map(id => allItemsList.find(item => item.id === id));
  
  return (
    <div className={styles.itemList}>
      {wishlistDetails.map((item, index) => (
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

  function removeFromWishlist(id) {
    setWishlistItems(wishlistItemList.filter(itemId => itemId !== id));
  }

  function addToCart(id){
    const alreadyExist = cartItemList.find((item) => item.id == id);
    console.log(alreadyExist);
    
    if (alreadyExist) {
      setPopUp(true);
      debouncedSetPopUp();
    } else {
      removeFromWishlist(id);
      setCartItems([...cartItemList, { id: id, count: 1 }]);
    }
  }

  return (
    <div className={styles.listItemCard}>
      <img src={props.imgUrl} className={styles.itemImg} />
      <div className={styles.itemInfoList}>
        <p className={styles.itemName}>{props.name}</p>
        <p className={styles.itemPrice}>₹ {props.price}</p>
        <div className={styles.btnDivList}>
          <button onClick={() => {addToCart(props.id)}} className={styles.cardBtn}>Add to cart</button>
          <button onClick={() => {removeFromWishlist(props.id)}} className={styles.cardBtn}>Remove from wishlist</button>
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

export default WishListItems;
