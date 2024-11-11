import gridIcon from "../assets/icon/action/grid.svg";
import listIcon from "../assets/icon/action/list.svg";
import styles from "../css/wishlist.module.css";
import placeholderImg from "../assets/images/ImagePlaceholder.jpg";
import { layout, popUp, wishlistBadge, cartBadge } from "../store/behaviourState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { wishlistItems } from "../store/wishListItemsState";
import { allItems } from "../store/allItemsState";
import { cartItems } from "../store/cartItemsState";
import { useCallback, useEffect } from "react";
import axios from "axios";

function WishListItems() {
  const popUpVal = useRecoilValue(popUp);
  const setAllItems = useSetRecoilState(allItems);
  const setWishlistItems = useSetRecoilState(wishlistItems);
  
  const authToken = localStorage.getItem("Authorization");
  useEffect(() => {
    async function fetchWishlist() {
      try {
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
        // console.log("authToken : " + authToken);
        const res = await axios.get("http://localhost:3001/wishlist/", {
          headers: {
            Authorization: authToken,
          },
        });

        const wishlist = res.data.wishlist;
        setWishlistItems(wishlist);

      } catch (e) {
        console.log(e);
      }
    }
    fetchWishlist();
  }, [])
  
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
      <h2 className="text-2xl">Your wishlist</h2>
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
  const [layoutValue, setLayout] = useRecoilState(layout);

  let isListLayout;
  {layoutValue == 'list' ? isListLayout = true : isListLayout = false}

  return (
    <div className={styles.header}>
      <h1 className="text-3xl">Your Wishlist</h1>
      <p className={styles.subHeading}>The choice is aapki</p>
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
  const wishlistItemIds = useRecoilValue(wishlistItems);
  const allItemsList = useRecoilValue(allItems);

  // console.log(wishlistItemIds);
  // console.log(allItemsList);

  const wishlistDetails = wishlistItemIds.map(id => allItemsList.find(item => item._id === id));
  
  return (
    <div className={styles.itemGrid}>
      {wishlistDetails.map((item, index) => (
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
  const setWishlistBadgeNo = useSetRecoilState(wishlistBadge);
  const setCartBadgeNo = useSetRecoilState(cartBadge);
  const setCartItems = useSetRecoilState(cartItems);
  const setPopUp = useSetRecoilState(popUp);

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSetPopUp = useCallback(debounce(() => setPopUp("none"), 2000));

  async function removeFromWishlist(id) {
    console.log("remove : " + id);
    
    const authToken = localStorage.getItem("Authorization");
    // console.log(authToken);
    
    try{
      const res = await axios.post("http://localhost:3001/wishlist/delete", {
        itemId: id
      },{
        headers:{
          Authorization: authToken
        }
      });

      console.log(res.data.updatedList);
      
      setWishlistItems(res.data.updatedList);
      setWishlistBadgeNo(res.data.updatedList.length);

    }catch(e){
      console.log(e);
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

      // console.log(res.data.cart);
      setCartItems(res.data.cart);
      setCartBadgeNo(res.data.cart.length);

      // console.log("removeWishlist");
      removeFromWishlist(id);

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
        <img src={props.imgUrl == "" ? placeholderImg : props.imgUrl} className={styles.itemImg} />
        <p className={styles.itemName}>{props.name}</p>
        <p className={styles.itemPrice}>₹ {props.price}</p>
      </div>
      <div className={styles.btnDivGrid}>
        <button onClick={() => {addToCart(props.id)}} className={styles.cardBtn}>Add to cart</button>
        <button onClick={() => {removeFromWishlist(props.id)}} className={styles.cardBtnTwo}>Remove from wishlist</button>
      </div>
    </div>
  );
}

function AllItemsListContainer() {
  const wishlistItemIds = useRecoilValue(wishlistItems);
  const allItemsList = useRecoilValue(allItems);

  const wishlistDetails = wishlistItemIds.map(id => allItemsList.find(item => item._id === id));
  
  return (
    <div className={styles.itemList}>
      {wishlistDetails.map((item, index) => (
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
  const [wishlistItemList, setWishlistItems] = useRecoilState(wishlistItems);
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

  async function removeFromWishlist(id) {
    console.log(id);
    
    const authToken = localStorage.getItem("Authorization");
    // console.log(authToken);
    
    try{
      const res = await axios.post("http://localhost:3001/wishlist/delete", {
        itemId: id
      },{
        headers:{
          Authorization: authToken
        }
      });

      console.log(res.data.updatedList);
      
      setWishlistItems(res.data.updatedList);
      setWishlistBadgeNo(res.data.updatedList.length);

    }catch(e){
      console.log(e);
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

      // console.log(res.data.cart);
      setCartItems(res.data.cart);
      setCartBadgeNo(res.data.cart.length);

      // console.log("removeWishlist");
      removeFromWishlist(id);

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
      <img src={props.imgUrl == "" ? placeholderImg : props.imgUrl} className={styles.itemImg} />
      <div className={styles.itemInfoList}>
        <p className={styles.itemName}>{props.name}</p>
        <p className={styles.itemPrice}>₹ {props.price}</p>
        <div className={styles.btnDivList}>
          <button onClick={() => {addToCart(props.id)}} className={styles.cardBtn}>Add to cart</button>
          <button onClick={() => {removeFromWishlist(props.id)}} className={styles.cardBtnTwo}>Remove from wishlist</button>
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

export default WishListItems;
