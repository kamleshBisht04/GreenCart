/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogIn, SetShowUserLogIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  console.log(cartItems);

  // Fetch All Products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add Products to Cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const currentQuantity = prev[itemId] ?? 0;
      const update = { ...prev, [itemId]: currentQuantity + 1 };

      return update;
    });
    toast.success("Item added to cart 🛒");
  };

  // Remove from cart (decrease/delete).
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const currentQuantity = prev[itemId];
      if (currentQuantity == null) return prev;

      const updated = { ...prev };
      if (currentQuantity <= 1) delete updated[itemId];
      else updated[itemId] = currentQuantity - 1;

      return updated;
    });
  };

  // Update Cart items
  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (quantity <= 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = quantity;
      }

      return updated;
    });
  };

  // Clear single item
  const removeItemCompletely = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  //Clear full Cart
  const clearCart = () => {
    setCartItems({});
  };

  //Get items Quantity
  const getItemQuantity = (itemId) => {
    return cartItems[itemId] || 0;
  };

  //Get total items Count
  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  //Get total Price
  const getTotalAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find((p) => p._id === id);
      return total + (product?.offerPrice || 0) * qty;
    }, 0);
  };

  const value = {
    user,
    setUser,
    navigate,
    isSeller,
    setIsSeller,
    showUserLogIn,
    SetShowUserLogIn,
    products,
    currency,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    removeItemCompletely,
    clearCart,
    getItemQuantity,
    getTotalItems,
    getTotalAmount,
    searchQuery,
    setSearchQuery,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
