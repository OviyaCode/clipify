import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaCut } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiTemplate } from "react-icons/hi";
import { IoVideocam } from "react-icons/io5";

import logo from "../assets/C.png";

const SideNav = () => {
  const userData = {
    name: "Oviya",
    plan: "Free plan",
  };

  const menus = [
    { id: 1, name: "New video", icon: <FaCut />, bgColor: "bg-purple-300", color:"text-purple-500" },
    { id: 2, name: "Home", icon: <AiFillHome />, bgColor: "bg-green-300", color:"text-green-500" },
    { id: 3, name: "Templates", icon: <HiTemplate />, bgColor: "bg-pink-300", color:"text-pink-500" },
    { id: 4, name: "All videos", icon: <IoVideocam />, bgColor: "bg-blue-300", color:"text-blue-500" },
  ];
  return (
    <div className="w-full h-full p-4 my-6 bg-white">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          className="w-14 rounded-md shadow-sm shadow-dark-color"
        />
        <h1 className="text-4xl font-bold text-dark-color md:text-2xl">Clipify</h1>
      </div>
      <div className="my-5 flex gap-3">
        <div className="w-14 h-14 bg-orange-300 shadow-sm shadow-orange-400 rounded-md flex justify-center items-center">
          <h1 className="text-4xl text-orange-600 font-semibold">
            {userData.name.charAt(0).toUpperCase()}
          </h1>
        </div>
        <div className="flex flex-col mt-2">
          <p className="font-semibold text-dark-color text-md">{userData.name}</p>
          <span className="text-gray-500 text-xs">{userData.plan}</span>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center">
          {menus.map((menu) => (
            <div className="cursor-pointer py-3 rounded-lg px-0 flex items-center gap-3 hover:bg-gray-color hover:scale-110 transition-all" key={menu.id}>
              <span className={`${menu.color} ${menu.bgColor} rounded-md p-4 text-[1.3em]`}>{menu.icon}</span>
              <h3 className={`font-bold ${menu.color}`}>{menu.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
