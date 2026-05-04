import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/seller' },
  ];

  const placeholders = [
    'Apple',
    'Banana',
    'Amul Milk',
    'Basmati Rice',
    'Wheat Flour',
    'Paneer',
    'Eggs',
    'Pepsi',
    'Coca-Cola',
  ];

  const {
    user,
    setUser,
    setShowUserLogIn,
    navigate,
    setSearchQuery,
    searchQuery,
    getTotalItems,
    axios,
  } = useAppContext();

  const totalItems = getTotalItems();

  const logout = async () => {
    try {
      const { data } = await axios.post('/api/user/logout');
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery?.trim()) {
      navigate('/products');
    }
  }, [searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 right-0 left-0 z-[9999] flex items-center justify-between border-b border-gray-300 bg-white/70 px-6 py-4 backdrop-blur-md md:px-16 lg:px-24 xl:px-32">
      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop */}
      <div className="hidden items-center gap-8 sm:flex">
        {/* LINKS */}
        <div className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              
              className={({ isActive }) =>
                `rounded-full underline-offset-4 transition ${
                  isActive ? 'text-primary' : 'hover:text-primary'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* SEARCH */}
        <div className="relative hidden items-center gap-2 rounded-full border border-gray-300 px-3 text-sm lg:flex">
          <input
            className="w-full bg-transparent py-1.5 outline-none"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {!searchQuery && (
            <div className="pointer-events-none absolute top-1.5 left-3 flex items-center gap-1">
              <span className="text-gray-400">Search for </span>
              <div className="h-5 overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateY(-${index * 20}px)` }}
                >
                  {placeholders.concat(placeholders).map((item, i) => (
                    <p key={i} className="text-primary h-5">
                      "{item}"
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          <img src={assets.search_icon} alt="search" />
        </div>

        {/* CART */}
        <div
          className="relative cursor-pointer"
          onClick={() => {
            if (!user) {
              toast.error('Please login first');
              setShowUserLogIn(true);
              return;
            }
            navigate('/cart');
          }}
        >
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
          {totalItems > 0 && (
            <button className="bg-primary absolute -top-2 -right-3 h-[18px] w-[18px] rounded-full text-xs text-white">
              {totalItems}
            </button>
          )}
        </div>

        {/* AUTH */}
        {!user ? (
          <button
            onClick={() => setShowUserLogIn(true)}
            className="bg-primary rounded-full px-8 py-2 text-white"
          >
            Login
          </button>
        ) : (
          <div className="group relative z-50">
            <img src={assets.profile_icon} className="w-10" />

            <ul className="absolute top-10 right-0 z-[9999] hidden w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 text-sm shadow-lg group-hover:block">
              <li
                onClick={() => navigate('/my-orders')}
                className="hover:text-primary cursor-pointer px-4 py-2 transition-all hover:bg-gray-100"
              >
                My Orders
              </li>

              <li
                onClick={logout}
                className="cursor-pointer px-4 py-2 transition-all hover:bg-gray-100 hover:text-red-500"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* MOBILE */}
      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => {
            if (!user) {
              toast.error('Please login first');
              setShowUserLogIn(true);
              return;
            }
            navigate('/cart');
          }}
          className="relative"
        >
          <img src={assets.nav_cart_icon} className="w-6" />
          {totalItems > 0 && (
            <button className="bg-primary absolute -top-2 -right-3 h-[18px] w-[18px] rounded-full text-xs text-white">
              {totalItems}
            </button>
          )}
        </div>

        <button onClick={() => setOpen(!open)}>
          <img src={assets.menu_icon} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-[60px] left-0 z-[9999] flex w-full flex-col gap-2 bg-white px-5 py-4 text-sm shadow-md md:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All products
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogIn(true);
              }}
              className="bg-primary mt-2 rounded-full px-6 py-2 text-white"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="bg-primary mt-2 rounded-full px-6 py-2 text-white"
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
