/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || '₹';

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogIn, setShowUserLogIn] = useState(false);

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const isInitialCartSync = useRef(true);

  /* ---------------- FETCH SELLER ---------------- */
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get('/api/seller/is-auth');
      setIsSeller(!!data.success);
    } catch {
      setIsSeller(false);
    }
  };

  /* ---------------- FETCH USER ---------------- */
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/is-auth');

      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch {
      setUser(null);
      setCartItems({});
    }
  };

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/product/list');
      setProducts(data.success ? data.products : []);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
  };

  /* ---------------- INIT APP ---------------- */
  useEffect(() => {
    const init = async () => {
      await fetchUser();
      await fetchSeller();
      await fetchProducts();
    };

    init();
  }, []);

  /* ---------------- CART SYNC FIXED ---------------- */
  useEffect(() => {
    const syncCart = async () => {
      try {
        const { data } = await axios.post('/api/cart/update', {
          cartItems,
        });

        if (!data.success) {
          toast.error(data.message || 'Cart update failed');
        }
      } catch (err) {
        console.log('Cart sync error:', err.message);
      }
    };

    // skip first render
    if (isInitialCartSync.current) {
      isInitialCartSync.current = false;
      return;
    }

    if (user) {
      syncCart();
    }
  }, [cartItems, user]);

  /* ---------------- CART FUNCTIONS ---------------- */
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    toast.success('Item added 🛒');
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (!updated[itemId]) return prev;

      if (updated[itemId] <= 1) delete updated[itemId];
      else updated[itemId] -= 1;

      return updated;
    });
  };

  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (quantity <= 0) delete updated[itemId];
      else updated[itemId] = quantity;

      return updated;
    });
  };

  const removeItemCompletely = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  const clearCart = () => setCartItems({});

  /* ---------------- HELPERS ---------------- */
  const getItemQuantity = (id) => cartItems[id] || 0;

  const getTotalItems = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const getTotalAmount = () =>
    Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find((p) => p._id === id);
      return total + (product?.offerPrice || 0) * qty;
    }, 0);

  /* ---------------- CONTEXT VALUE ---------------- */
  const value = {
    user,
    setUser,
    navigate,

    isSeller,
    setIsSeller,

    showUserLogIn,
    setShowUserLogIn,

    products,
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

    currency,
    axios,

    fetchProducts,

    loading,
    setLoading,

    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/* ---------------- HOOK ---------------- */
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }

  return context;
};
