import "./App.css";
import NavBar from "./components/navbar";
import Cart from "./components/cart";
import Items from "./components/items";
import { SignUpPage } from "./components/signup";
import { SignInPage } from "./components/signin";
import WishListItems from "./components/wishlist";
import { Routes, Route, useLocation } from "react-router-dom";

// Implement routing here
function App() {
  const location = useLocation();
  const hideNavBarPaths = ["/signup", "/signin"];

  return (
    <div className="w-screen h-screen bg-white overflow-y-scroll">
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="/items" element={<Items />} />
        <Route path="wishlist" element={<WishListItems />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
