import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Footer from "./layout/Footer";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogIn from "./components/seller/SellerLogIn";
import SellerLayout from "./pages/seller/sellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogIn, isSeller } = useAppContext();
  return (
    <div className="text-default min-h-screen bg-white text-gray-700">
      {!isSellerPath && <Navbar />}
      {showUserLogIn ? <Login /> : null}
      <Toaster />
      <div
        className={`${isSellerPath ? "h-screen" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogIn />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
