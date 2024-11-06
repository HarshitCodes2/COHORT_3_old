import gridIcon from "../assets/icon/action/grid.svg";
import listIcon from "../assets/icon/action/list.svg";
import styles from "../css/wishlist.module.css";
import placeholderImg from "../assets/images/ImagePlaceholder.jpg";
import { layout } from "../store/behaviourState";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

function WishListItems() {
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
        {/* Add clicked style for when a button is selected and it stays that way */}
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
  return (
    <div className={styles.itemGrid}>
      <GridItemCard />
      <GridItemCard />
      <GridItemCard />
      <GridItemCard />
      <GridItemCard />
      <GridItemCard />
      <GridItemCard />
      <GridItemCard />
      <GridItemCard />
      <GridItemCard />
    </div>
  );
}

function GridItemCard() {
  return (
    <div className={styles.gridItemCard}>
      <div className={styles.itemInfoGrid}>
        <img src={placeholderImg} className={styles.itemImg} />
        <p className={styles.itemName}>KeyBoard Lelo for 1234 Rs.</p>
        <p className={styles.itemPrice}>₹1234.00</p>
      </div>
      <div className={styles.btnDivGrid}>
        <button className={styles.cardBtn}>Add to cart</button>
        <button className={styles.cardBtn}>Remove from wishlist</button>
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
          <button className={styles.cardBtn}>Remove from wishlist</button>
        </div>
      </div>
    </div>
  );
}

export default WishListItems;
