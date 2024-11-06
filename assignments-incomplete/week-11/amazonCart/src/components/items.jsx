import gridIcon from "../assets/icon/action/grid.svg";
import listIcon from "../assets/icon/action/list.svg";
import styles from "../css/allitems.module.css";
import placeholderImg from "../assets/images/ImagePlaceholder.jpg";
import { layout } from "../store/behaviourState";
import { allItems } from "../store/allItemsState";
import { wishlistItems } from "../store/wishListItemsState";
import { cartItems } from "../store/cartItemsState";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Items() {
  return (
    <div className={styles.itemContainer}>
      <RecoilRoot>
        <SideBar />
        <MainContent />
      </RecoilRoot>
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
      {
        itemList.map((item, index) => (
          <GridItemCard key={index} id={item.id} name={item.name} price={item.price} imgUrl={item.imgUrl}/>
        ))
      }
    </div>
  );
}

function GridItemCard(props) {
  const [ wishlistItemList, setWishlistItems ] = useRecoilState(wishlistItems);
  const [ cartItemList, setCartItems ] = useRecoilState(cartItems);

  function addToWishlist(id){
    console.log(id + " added to  wishlist");
    setWishlistItems([...wishlistItemList, id], function (){console.log("wish " + wishlistItemList);});
  }
  
  function addToCart(id){
    console.log(id + " added to  cart");
    setCartItems([...cartItemList, id], () => {console.log("cart " + cartItemList);});
  }

  return (
    <div className={styles.gridItemCard}>
      <div className={styles.itemInfoGrid}>
        <img src={props.imgUrl} className={styles.itemImg} />
        <p className={styles.itemName}>{props.name}</p>
        <p className={styles.itemPrice}>₹ {props.price}</p>
      </div>
      <div className={styles.btnDivGrid}>
        <button onClick={() => addToCart(props.id)} className={styles.cardBtn}>Add to cart</button>
        <button onClick={() => addToWishlist(props.id)} className={styles.cardBtn}>Add to wishlist</button>
      </div>
    </div>
  );
}

function AllItemsListContainer() {
  return (
    <div className={styles.itemList}>
      <ListItemCard />
      <ListItemCard />
      <ListItemCard />
      <ListItemCard />
      <ListItemCard />
      <ListItemCard />
    </div>
  );
}

function ListItemCard() {
  return (
    <div className={styles.listItemCard}>
      <img src={placeholderImg} className={styles.itemImg} />
      <div className={styles.itemInfoList}>
        <p className={styles.itemName}>KeyBoard Lelo for 1234 Rs.</p>
        <p className={styles.itemPrice}>₹1234.00</p>
        <div className={styles.btnDivList}>
          <button className={styles.cardBtn}>Add to cart</button>
          <button className={styles.cardBtn}>Add to wishlist</button>
        </div>
      </div>
    </div>
  );
}

export default Items;
