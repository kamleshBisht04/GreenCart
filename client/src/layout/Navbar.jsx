import { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, SetShowUserLogIn, navigate } = useAppContext();

  const logout = async () => {
    setUser(null);
    navigate("/");
  };
  return (
    <nav className="relative flex items-center justify-between border-b border-gray-300 bg-white px-6 py-4 transition-all md:px-16 lg:px-24 xl:px-32">
      <NavLink to="/">
        <img src={assets.logo} alt="GreenCart website logo" />
      </NavLink>
      {/* Desktop Menu */}
      <div className="hidden items-center gap-8 sm:flex">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <div className="hidden items-center gap-2 rounded-full border border-gray-300 px-3 text-sm lg:flex">
          <input
            className="w-full bg-transparent py-1.5 placeholder-gray-500 outline-none"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" />
        </div>

        <div className="relative cursor-pointer">
          <img
            src={assets.nav_cart_icon}
            alt="shopping Cart "
            className="w-6 opacity-80"
          />
          <button className="bg-primary absolute -top-2 -right-3 h-[18px] w-[18px] rounded-full text-xs text-white">
            3
          </button>
        </div>

        <button className="bg-primary hover:bg-primary-dull cursor-pointer rounded-full px-8 py-2 text-white transition">
          Login
        </button>
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <img src={assets.menu_icon} alt="menu" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full flex-col items-start gap-2 bg-white px-5 py-4 text-sm shadow-md md:hidden`}
      >
        <NavLink to="/" onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={() => setOpen(false)}>
          All products
        </NavLink>
        {user && (
          <NavLink to="/" onClick={() => setOpen(false)}>
            My Orders
          </NavLink>
        )}
        <NavLink to="/contact" onClick={() => setOpen(false)}>
          Contact
        </NavLink>
        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              SetShowUserLogIn(true);
            }}
            className="bg-primary hover:bg-primary-dull mt-2 cursor-pointer rounded-full px-6 py-2 text-sm text-white transition"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="bg-primary hover:bg-primary-dull mt-2 cursor-pointer rounded-full px-6 py-2 text-sm text-white transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
