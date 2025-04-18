import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logo } from "../assets/assets";
import { FiSearch } from "react-icons/fi";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import Toggle from "./Toggle";

// UserMenu Component (Fixed)
const UserMenu = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="absolute right-0 top-full mt-2 bg-lime-200 shadow-lg min-w-[150px] w-auto rounded-md text-left font-semibold opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-lime-950 hover:bg-lime-100"
        >
          Logout
        </button>
      ) : (
        <>
          <NavLink
            to="/login"
            className="block px-4 py-2 text-lime-950 hover:bg-lime-100"
          >
            Login
          </NavLink>
          <NavLink
            to="/sign-up"
            className="block px-4 py-2 text-lime-950 hover:bg-lime-100"
          >
            Signup
          </NavLink>
        </>
      )}
    </div>
  );
};

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showSearch, setShowSearch, totalCart } = useContext(ShopContext); // Access totalCart from context
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if the current page is not "/collection"
  const shouldShowSearch = location.pathname === "/collection";

  return (
    <nav className="flex items-center justify-between p-2">
      <div className="flex">
        <NavLink to="/" className="group block">
          <img
            src={logo}
            alt="logo"
            className="hidden md:block w-20 sm:w-28 md:w-34 transform transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </NavLink>
     
        {/* Hamburger menu on mobile (left side) */}
        <div className="md:hidden flex items-center justify-start cursor-pointer z-10">
          <div className="relative group">
            <button
              onClick={toggleMenu}
              className="text-lime-950 focus:outline-none"
            >
              <img
                src={logo}
                alt="logo"
                className="w-34 transform transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
              />
            </button>
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 bg-lime-200 shadow-md rounded-md w-40">
                <NavLink
                  onClick={toggleMenu}
                  to="/"
                  className="block px-4 py-2 text-lime-950 font-semibold hover:bg-lime-100 "
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={toggleMenu}
                  to="/collection"
                  className="block px-4 py-2 text-lime-950 font-semibold hover:bg-lime-100"
                >
                  Collection
                </NavLink>
                <NavLink
                  onClick={toggleMenu}
                  to="/about"
                  className="block px-4 py-2 text-lime-950 font-semibold hover:bg-lime-100"
                >
                  About
                </NavLink>
                <NavLink
                  onClick={toggleMenu}
                  to="/contact"
                  className="block px-4 py-2 text-lime-950 font-semibold hover:bg-lime-100"
                >
                  Contact
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main menu for larger screens */}
      <ul className="hidden md:flex gap-4 lg:gap-6 text-lg md:text-2xl lg:text-3xl text-lime-800 font-heading tracking-wider dark:text-lime-200 ml-1">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 w-fit group"
        >
          <p className="transform transition-transform duration-300 ease-in-out group-hover:scale-130 group-focus:scale-120">
            Home
          </p>
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 w-fit group"
        >
          <p className="transform transition-transform duration-300 ease-in-out group-hover:scale-130 group-focus:scale-120">
            Collection
          </p>
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 w-fit group"
        >
          <p className="transform transition-transform duration-300 ease-in-out group-hover:scale-130 group-focus:scale-120">
            About
          </p>
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 w-fit group"
        >
          <p className="transform transition-transform duration-300 ease-in-out group-hover:scale-130 group-focus:scale-130">
            Contact
          </p>
        </NavLink>
      </ul>

      {/* Right side items */}
      <div className="flex items-center gap-3 ml-2">
      <Toggle />
        {/* Conditionally render the Search icon only on /collection page */}
        {shouldShowSearch && (
          <div className="relative group">
            <div className="p-2">
              <FiSearch
                onClick={() => {
                  setShowSearch(!showSearch);
                }}
                className="text-2xl cursor-pointer text-lime-800 dark:text-lime-200 transform transition-transform duration-300 ease-in-out group-hover:scale-120 group-focus:scale-120"
              />
            </div>
          </div>
        )}

        <div className="relative group">
          <NavLink to="/wishlist" className="p-2">
            <IoIosHeart className="text-2xl cursor-pointer text-lime-800 dark:text-lime-200 transform transition-transform duration-300 ease-in-out group-hover:scale-120 group-focus:scale-120" />
          </NavLink>
        </div>

        <div className="relative group">
          <NavLink to="/cart" className="p-2">
            <FaShoppingCart className="text-2xl cursor-pointer text-lime-800 transform transition-transform duration-300 ease-in-out group-hover:scale-120 group-focus:scale-120 dark:text-lime-200 " />
            {/* Display the total number of items in the cart dynamically */}
            <span className="absolute top-4 left-4 inline-flex items-center justify-center w-5 h-5 bg-lime-200 text-lime-950 dark:bg-rose-200 dark:text-rose-950 text-xs font-semibold rounded-full">
              {totalCart} {/* Updated to show totalCart from context */}
            </span>
          </NavLink>
        </div>

        {/* User Icon with Fixed Dropdown Position */}
        <div className="relative group">
          <button className="p-2">
            <IoPersonSharp className="text-2xl cursor-pointer text-lime-800 dark:text-lime-200" />
          </button>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
