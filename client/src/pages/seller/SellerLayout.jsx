import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const SellerLayout = () => {
  const { setIsSeller } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    setIsSeller(false);
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 md:px-8">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="w-34 cursor-pointer md:w-38"
          />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={() => {
              logout();
            }}
            className="rounded-full border px-4 py-1 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="flex h-[550px] w-16 flex-col border-r border-gray-300 pt-4 text-base transition-all duration-300 md:w-64">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary border-r-4 md:border-r-[6px]"
                    : "border-white hover:bg-gray-100/90"
                }`
              }
            >
              <img src={item.icon} className="h-7 w-7" />
              <p className="hidden text-center md:block">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SellerLayout;
