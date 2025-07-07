import React from "react";
import { NavLink } from "react-router";
const NotFound = () => {
  return (
    <div className="w-11/12 mx-auto flex flex-col justify-center items-center gap-6">
      <img
        src={"https://i.ibb.co/fY784y0H/error2.jpg"}
        alt=""
        className="rounded-lg w-[800px] h-[500px]"
      />
      <h1 className="text-4xl text-red-600 ">404 - page not found</h1>
      <p>Opss!! the page you are looking for doesn't exists</p>

      <NavLink to={"/"}>
        <button className="btn btn-primary bg-primary text-black border-none">
          Go back to Home
        </button>
      </NavLink>
    </div>
  );
};

export default NotFound;
