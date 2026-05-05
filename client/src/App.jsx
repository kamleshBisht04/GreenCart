import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppContext } from './context/AppContext';

import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Login from './components/Login';
import AppToaster from './components/AppToaster';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Contact from './pages/Contact';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';

import SellerLogIn from './components/seller/SellerLogIn';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import NotFound from './pages/NotFound';

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.startsWith('/seller');

  const { showUserLogIn, isSeller } = useAppContext();

  // Lock scroll when login modal is open
  useEffect(() => {
    document.body.style.overflow = showUserLogIn ? 'hidden' : 'auto';
  }, [showUserLogIn]);

  return (
    <div className="flex h-screen flex-col bg-white text-gray-700">
      {/* Navbar */}
      {!isSellerPath && <Navbar />}

      {/* Login Modal */}
      {showUserLogIn && <Login />}

      <AppToaster />

      {/* MAIN CONTENT */}
      <div className="min-h-0 flex-1">
        <div
          className={
            isSellerPath
              ? 'flex h-full flex-col'
              : 'px-6 md:px-16 lg:px-24 xl:px-32'
          }
        >
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route
              path="/products/:category/:id"
              element={<ProductDetails />}
            />
            <Route path="/contact" element={<Contact />} />

            {/* USER PROTECTED ROUTES */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="*" element={<NotFound />} />

            {/* SELLER ROUTES */}
            <Route
              path="/seller/*"
              element={isSeller ? <SellerLayout /> : <SellerLogIn />}
            >
              <Route index element={<AddProduct />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Routes>
        </div>

        {/* Footer */}
        {!isSellerPath && <Footer />}
      </div>
    </div>
  );
};

export default App;
