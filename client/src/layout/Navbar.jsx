import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogIn,
    navigate,
    setSearchQuery,
    searchQuery,
    getTotalItems,
  } = useAppContext();
  const totalItems = getTotalItems();

  const logout = async () => {
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (searchQuery?.trim()) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-300 bg-white/70 px-6 py-4 backdrop-blur-md transition-all md:px-16 lg:px-24 xl:px-32">
      <NavLink to="/" onClick={() => setOpen(false)}>
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src={assets.search_icon} alt="search" />
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img
            src={assets.nav_cart_icon}
            alt="shopping Cart "
            className="w-6 opacity-80"
          />
          {totalItems > 0 && (
            <button className="bg-primary absolute -top-2 -right-3 h-[18px] w-[18px] rounded-full text-xs text-white">
              {totalItems}
            </button>
          )}
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogIn(true)}
            className="bg-primary hover:bg-primary-dull cursor-pointer rounded-full px-8 py-2 text-white transition"
          >
            Login
          </button>
        ) : (
          <div className="group relative">
            <img src={assets.profile_icon} className="w-10" alt="profile" />
            <ul className="absolute top-10 right-0 z-40 hidden w-30 rounded-md border border-gray-200 bg-white py-2.5 text-sm shadow group-hover:block">
              <li
                onClick={() => navigate("my-orders")}
                className="hover:bg-primary/10 cursor-pointer p-1.5 pl-3"
              >
                My Order
              </li>
              <li
                onClick={logout}
                className="hover:bg-primary/10 cursor-pointer p-1.5 pl-3"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      {/*  mobile menu and cart  */}
      <div className="flex items-center gap-6 sm:hidden">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img
            src={assets.nav_cart_icon}
            alt="shopping Cart "
            className="w-6 opacity-80"
          />
          {totalItems > 0 && (
            <button className="bg-primary absolute -top-2 -right-3 h-[18px] w-[18px] rounded-full text-xs text-white">
              {totalItems}
            </button>
          )}
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
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
                setShowUserLogIn(true);
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
      )}
    </nav>
  );
};

export default Navbar;
