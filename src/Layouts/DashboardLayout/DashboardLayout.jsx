import React from "react";
import Dashboard from "../../Components/Dashboard/Dashboard";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <Dashboard></Dashboard>
      <div className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
