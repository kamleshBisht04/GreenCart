import { Route, Routes, useLocation } from 'react-router-dom';
import { useAppContext } from './context/AppContext';

import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Login from './components/Login';

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
import AppToaster from './components/AppToaster';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
  const { showUserLogIn, isSeller } = useAppContext();

  return (
    <div className="flex h-screen flex-col bg-white text-gray-700">
      {!isSellerPath && <Navbar />}
      {showUserLogIn && <Login />}
      <AppToaster />

      {/* MAIN AREA */}
      <div className="min-h-0 flex-1">
        <div
          className={
            isSellerPath
              ? 'flex h-full flex-col'
              : 'px-6 md:px-16 lg:px-24 xl:px-32'
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route
              path="/products/:category/:id"
              element={<ProductDetails />}
            />
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
            <Route path="/contact" element={<Contact />} />

            {/* SELLER */}
            <Route
              path="/seller"
              element={isSeller ? <SellerLayout /> : <SellerLogIn />}
            >
              <Route index element={<AddProduct />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Routes>
        </div>
        {!isSellerPath && <Footer />}
      </div>
    </div>
  );
};

export default App;
