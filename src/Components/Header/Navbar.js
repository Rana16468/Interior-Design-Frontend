import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { GrUserAdmin } from "react-icons/gr";
import { IoIosImages } from "react-icons/io";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handelLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  const displayData = user?.displayName?.split(",") || undefined;

  const logoutHandelar = user?.email ? (
    <>
      <li>
        <Link className="btn btn-outline btn-sm m-1" onClick={handelLogOut}>
          LogOut
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/login" className="btn btn-outline btn-sm m-1 ">
          Sing-In
        </Link>
      </li>
      <li>
        <Link to="/register" className="btn btn-outline btn-sm m-1 ">
          Registration
        </Link>
      </li>

      <li>
        <Link to="/blog" className="btn btn-outline btn-sm m-1 ">
          Blog
        </Link>
      </li>
    </>
  );

  // seller Account
  const sellerAccount = displayData ? displayData[1] : "";
  const sellerAccountRouter =
    sellerAccount === "Seller Account" ? (
      <>
        <li>
          <Link
            to="/add-design-catagories"
            className="btn btn-outline btn-sm m-1 ">
            Add Categores
          </Link>
        </li>
        <li>
          <Link to="/categories-list" className="btn btn-outline btn-sm m-1 ">
            Categories List
          </Link>
        </li>

        <li>
          <Link to="/myBuyerList" className="btn btn-outline btn-sm m-1 ">
            My-Buyer
          </Link>
        </li>
        <li>
          <Link to="/imageGenerated" className="btn btn-outline btn-sm m-1">
            <IoIosImages className="text-xl text-white " />
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="btn btn-outline btn-sm m-1 ">
            Dashboard
          </Link>
        </li>
      </>
    ) : (
      <></>
    );

  const buyerAccountRouter =
    sellerAccount === "Buyer Account" ? (
      <>
        <li>
          <Link to="/my_bookinglist" className="btn btn-outline btn-sm m-1 ">
            My Booking
          </Link>
        </li>
        <li>
          <Link to="/WishList" className="btn btn-outline btn-sm m-1 ">
            Wish List
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="btn btn-outline btn-sm m-1 ">
            Dashboard
          </Link>
        </li>
      </>
    ) : (
      <></>
    );

  // option router
  const optionalLoginUser =
    displayData?.length === 1 ? (
      <>
        <li>
          <Link to="/my_bookinglist" className="btn btn-outline btn-sm m-1 ">
            My Booking
          </Link>
        </li>
        <li>
          <Link to="/WishList" className="btn btn-outline btn-sm m-1 ">
            Wish List
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="btn btn-outline btn-sm m-1 ">
            Dashboard
          </Link>
        </li>
      </>
    ) : (
      <></>
    );

  const handelToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <>
      <div className="navbar bg-[#0891b2]">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-white">
              <li>
                <button className="btn btn-outline btn-sm m-1">Home</button>
              </li>
              <li>
                <button className="btn btn-outline btn-sm m-1">
                  Industry Analysis
                </button>
              </li>

              {sellerAccountRouter}
              {buyerAccountRouter}
              {logoutHandelar}
              {optionalLoginUser}
            </ul>
          </div>
          <a
            href="..."
            className="btn btn-ghost normal-case text-white text-xl">
            DYD
          </a>

          <p className="font-bold  font-serif text-xl">
            <Link>{displayData ? displayData[0] : ""}</Link>
          </p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <Link to="/" className="btn btn-outline btn-sm m-1 ">
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/industry_Analysis"
                className="btn btn-outline btn-sm m-1 ">
                Industry Analysis
              </Link>
            </li>
            {sellerAccountRouter}
            {buyerAccountRouter}
            {logoutHandelar}
            {optionalLoginUser}
          </ul>
        </div>

        <label
          htmlFor="setting-dashboard"
          tabindex={3}
          className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 lg:hidden mt-2">
          <GrUserAdmin className="text-xs text-white" />
        </label>

        <div className="navbar-end ">
          <p className="font-bold  font-serif text-xl mr-2">
            {displayData?.length === 1 ? (
              <Link>Buyer Account</Link>
            ) : (
              <>{displayData ? displayData[1] : ""}</>
            )}
          </p>
          <label className="swap swap-rotate mr-2 ">
            <input type="checkbox" onChange={handelToggle} />

            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {/* user profile  */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img alt="" src={user ? user?.photoURL : ""} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link
                  className="justify-between btn btn-outline btn-primary btn-sm m-1"
                  to="/user_profile">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/user_profile" className="btn btn-outline btn-sm m-1">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/about" className="btn btn-outline btn-sm m-1">
                  About
                </Link>
              </li>
              <li>
                <Link to="/Service" className="btn btn-outline btn-sm m-1">
                  Service
                </Link>
              </li>
              <li>
                <Link to="/Contruct" className="btn btn-outline btn-sm m-1 ">
                  Contract
                </Link>
              </li>

              {logoutHandelar}
            </ul>
            <label
              htmlFor="my-drawer-2"
              tabIndex={0}
              className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
