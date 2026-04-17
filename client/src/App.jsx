import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import CategoryBar from "./components/CategoryBar";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Footer from "./layout/Footer";
import AddAddress from "./pages/AddAddress";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogIn } = useAppContext();
  return (
    <div>
      {!isSellerPath && (
        <>
          <Navbar />
          <CategoryBar />
        </>
      )}
      {showUserLogIn ? <Login /> : null}
      <Toaster />
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
