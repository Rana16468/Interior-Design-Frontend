import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAdmin from "../Hook/useAdmin";
import Navbar from "../Header/Navbar";
import { Link, Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  return (
    <>
      <Navbar />

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content ">
            {isAdmin?.Admin ? (
              <>
                <li className="m-1">
                  <Link
                    className="btn btn-outline border-t-neutral-700 btn-sm"
                    to="/dashboard/all_wish_list">
                    All Wish List
                  </Link>
                </li>
                <li className="m-1">
                  <Link
                    className="btn btn-outline border-t-neutral-700 btn-sm"
                    to="/dashboard/all_bookinglist">
                    All Booking List
                  </Link>
                </li>
                <li className="m-1">
                  <Link
                    className="btn btn-outline border-t-neutral-700 btn-sm"
                    to="/dashboard/all_categories_details">
                    Service List
                  </Link>
                </li>
                <li className="m-1">
                  <Link
                    className="btn btn-outline border-t-neutral-700 btn-sm"
                    to="/dashboard/all_payment_list">
                    Payment List
                  </Link>
                </li>
                <li className="m-1">
                  <Link
                    className="btn btn-outline border-t-neutral-700 btn-sm"
                    to="/dashboard/all_report_list">
                    All Reports
                  </Link>
                </li>
                {/* all_user_list */}
                <li className="m-1">
                  <Link
                    className="btn btn-outline border-t-neutral-700 btn-sm"
                    to="/dashboard/all_user_list">
                    All Users
                  </Link>
                </li>
                <li className="m-1">
                  <Link
                    to="/dashboard/ContractList"
                    className="btn btn-outline border-t-neutral-700 btn-sm">
                    Contract
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="m-1">
                  <Link
                    to="/"
                    className="btn btn-outline border-t-neutral-700 btn-sm">
                    Home
                  </Link>
                </li>
                <li className="m-1">
                  <Link
                    to="/Service"
                    className="btn btn-outline border-t-neutral-700 btn-sm">
                    Service
                  </Link>
                </li>
                <li className="m-1">
                  <Link
                    to="/about"
                    className="btn btn-outline border-t-neutral-700 btn-sm">
                    About
                  </Link>
                </li>
                <li className="m-1">
                  <Link
                    to="/Contruct"
                    className="btn btn-outline border-t-neutral-700 btn-sm">
                    Contract
                  </Link>
                </li>
              </>
            )}
            {/* Sidebar content here */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;
