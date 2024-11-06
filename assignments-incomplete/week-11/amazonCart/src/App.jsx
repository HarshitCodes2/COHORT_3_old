import "./App.css";
import NavBar from "./components/navbar";
import Cart from "./components/cart";
import Items from "./components/items";
import WishListItems from "./components/wishlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Implement routing here
function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="wishlist" element={<WishListItems />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
