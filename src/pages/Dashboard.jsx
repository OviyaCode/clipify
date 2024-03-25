import React, { useEffect } from "react";
import Home from "./Home";
import SideNav from "../components/SideNav";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Home - Clipify";
  }, []);
  return (
    <div className="w-full h-screen bg-base-color">
      <div className="flex flex-col xl:flex-row lg:flex-row md:flex-row w-full h-full">
        <div className="xl:w-[20%] lg:w-[20%] md:w-[40%] w-full bg-white xl:h-full lg:h-full md:h-full h-fit">
          <SideNav />
        </div>
        <div className="xl:w-[80%] lg:w-[80%] md:w-full bg-base-color">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
