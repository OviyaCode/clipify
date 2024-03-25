import React, { useContext, useState } from "react";
import avatar from "../assets/avatar/avatar-1.jpg";
import { IoSearchSharp } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { FaCut } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import ProjectsContext from "../context/ProjectContext.jsx";

const Home = () => {
  const navigate = useNavigate();
  const [shortMenu, setShortMenu] = useState(false);
  const { projects } = useContext(ProjectsContext);

  const handleShortMenu = () => {
    setShortMenu(!shortMenu);
  };

  const handleVideoClick = (video) => {
    navigate(`/edit/${video.id}`);
  };
  console.log("projects", projects);
  console.log("thumbnail", projects[0].thumbnail);
  const cards = [
    { id: 1, cardName: "Create Project", cardIcon: <FaCut />, tag: "" },
    {
      id: 2,
      cardName: "Record Video",
      cardIcon: <IoVideocam />,
      tag: "Latest",
    },
  ];
  const handleCreate = () =>{
    navigate("/edit/002")
  }
  return (
    <section className="w-full h-full">
      <div className="w-full h-full mt-[10px] p-3">
        {/* home head */}
        <div className="flex flex-col-reverse md:flex-row lg:flex-row xl:flex-row w-full justify-between items-center gap-3 mt-6 mb-3">
          <div className="w-[85%]">
            <div className="flex justify-center items-center bg-white p-3 rounded-full gap-3">
              <IoSearchSharp className="text-secondary-color text-2xl bg-base-color w-10 h-10 p-2 rounded-full shadow" />
              <input
                placeholder="Search..."
                className="w-full h-full bg-transparent outline-none z-10"
              />
            </div>
          </div>
          <div className="w-[10%] ">
            <img src={avatar} className="w-14 rounded-full" />
          </div>
        </div>
        <div className="flex px-3 xl:justify-start lg:justify-start xl:items-start lg:items-start justify-center items-center w-full flex-col gap-3">
          <h3 className="text-2xl hidden xl:block lg:block md:block text-dark-color font-semibold p-2">
            Let's create some{" "}
            <span className="bg-highlight-color p-1 px-2 text-white rounded-md">
              Videos !
            </span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="block z-50 cursor-pointer cards w-[300px] p-5 rounded-xl bg-white shadow-md"
                onClick={handleCreate}
              >
                <div className="flex items-center justify-between">
                  <span className="w-20 bg-purple-300 text-2xl text-purple-600 rounded-md h-12 flex justify-center items-center">
                    {card.cardIcon}
                  </span>
                  <p className="px-3 w-full text-[1.2em] text-dark-color font-semibold">
                    {card.cardName}
                  </p>
                  {card.tag
                    ? card.tag && (
                        <span className=" bg-green-400 p-2 rounded-lg text-xs text-green-900 ">
                          {card.tag}
                        </span>
                      )
                    : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex px-4 mt-5">
          <div className="w-full flex items-center justify-between px-6">
            <h2 className="text-[1.1em] font-semibold">Recent Videos</h2>
            <h2 className="text-[1.1em] font-semibold underline flex justify-center items-center gap-1">
              All Videos{" "}
              <span>
                <FaChevronRight />
              </span>{" "}
            </h2>
          </div>
        </div>
        <div className="w-full xl:justify-start lg:justify-start justify-center flex gap-3 px-3 mt-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-lg w-[350px] h-fit p-3 cursor-pointer"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 bg-gray-800 opacity-50 rounded-md"
                  onClick={() => handleVideoClick(project)}
                ></div>
                <img
                  src={project.thumbnail}
                  className="w-full h-full rounded-md"
                />
              </div>
              <div className="flex justify-between items-center">
                <h1 className="py-2 font-semibold">{project.title}</h1>
                <button onClick={handleShortMenu}>
                  <HiOutlineDotsHorizontal />
                </button>
              </div>
              <div
                className={`bg-base-color border-[1px] border-slate-200 rounded w-fit h-fit p-3 absolute shadow ml-[15%] mt-[-14px] ${
                  shortMenu ? "block" : "hidden"
                }`}
              >
                <h1 className="flex items-center gap-1 text-red-500 text-md">
                  Delete <MdDelete />{" "}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
