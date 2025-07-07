import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router";
import { Tooltip } from "react-tooltip";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const links = (
    <>
      <NavLink
        to={"/"}
        className="py-1 px-2 hover:bg-gray-700 rounded-2xl nav-menu  lg:text-xl"
      >
        Home
      </NavLink>
      {user?.role == "manager" && (
        <>
          <NavLink
            to={"/dashboard/addDestinations"}
            className="py-1 px-2 hover:bg-gray-700 rounded-2xl nav-menu  lg:text-xl"
          >
            Add Bookings
          </NavLink>
          <NavLink
            to={"/dashboard/addPackage"}
            className="py-1 px-2 hover:bg-gray-700 rounded-2xl nav-menu  lg:text-xl"
          >
            Add Packages
          </NavLink>
        </>
      )}
      {user?.role == "customer" && (
        <>
          <NavLink
            to={"/dashboard/addPackage"}
            className="py-1 px-2 hover:bg-gray-700 rounded-2xl nav-menu  lg:text-xl"
          >
            Add Bookings
          </NavLink>
        </>
      )}
    </>
  );

  const handleLogoutBtn = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        Swal.fire({
          title: "Logged out!",
          icon: "success",
          draggable: true,
        });
      })
      .catch(() => {
        // An error happened.
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"}>
          <img
            src={"https://i.ibb.co/LDBRcXBd/Group-1330.png"}
            alt=""
            className="w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end space-x-2 md:space-x-3 lg:space-x-4">
        {user && (
          <Link
            to={"/userProfile"}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={user.displayName}
          >
            <img
              src={user?.photoURL}
              alt=""
              className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full"
            />
          </Link>
        )}
        <Tooltip id="my-tooltip" />
        {user ? (
          <Link>
            <button
              onClick={handleLogoutBtn}
              className="btn btn-primary btn-xs md:btn-lg"
            >
              Logout
            </button>
          </Link>
        ) : (
          <div className="space-x-2 md:space-x-3 lg:space-x-4">
            <Link to={"/register"}>
              <button className="btn btn-primary btn-xs md:btn-lg">
                Register
              </button>
            </Link>

            <Link to={"/login"}>
              <button className="btn btn-primary btn-xs md:btn-lg">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
