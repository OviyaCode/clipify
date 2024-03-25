import React, { useContext, useEffect, useRef, useState } from "react";
import ProjectsContext from "../context/ProjectContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  IoIosAddCircle,
  IoIosPlayCircle,
  IoMdMusicalNote,
} from "react-icons/io";
import { IoPlayForwardCircle, IoPlayBackCircle } from "react-icons/io5";
import { FaCut, FaEye, FaLock, FaHandPaper } from "react-icons/fa";
import {
  FaPaste,
  FaArrowRotateRight,
  FaArrowRotateLeft,
  FaArrowPointer,
  FaCropSimple,
  FaUpload,
} from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { VscSplitHorizontal } from "react-icons/vsc";
import { RiZoomOutFill, RiZoomInFill } from "react-icons/ri";

const VideoEdit = () => {
  const { projects } = useContext(ProjectsContext);
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const fileUploadRef = useRef(null);
  const audioRef = useRef(null);
  const projectId = id;
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const project = projects.find((project) => project.id === projectId);
  const [durations, setDurations] = useState({});
  const [audioDurations, setAudioDurations] = useState({});
  const [selectedClip, setSelectedClip] = useState(null);
  const navigate = useNavigate();

  const [propertiseData, setPropertiseData] = useState({
    scale: 0,
    rotate: 0,
    opacity: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertiseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const playAudio = (src) => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (project && project.clips) {
      const durationsObj = {};
      Promise.all(
        project.clips.map((clip) => {
          const video = document.createElement("video");
          video.src = clip.src;
          return new Promise((resolve) => {
            video.onloadedmetadata = () => {
              durationsObj[clip.id] = video.duration;
              console.log(durationsObj[clip.id]);
              resolve();
            };
          });
        })
      ).then(() => {
        setDurations(durationsObj);
        setLoading(false);
      });
    }
    if (project && project.audioTracks) {
      const audioDurationsObj = {};
      Promise.all(
        project.audioTracks.map((audioTrack) => {
          return new Promise((resolve) => {
            const audio = new Audio(audioTrack.src);
            audio.addEventListener("loadedmetadata", () => {
              audioDurationsObj[audioTrack.id] = audio.duration;
              console.log(audioDurationsObj[audioTrack.id]);
              resolve();
            });
          });
        })
      ).then(() => {
        setAudioDurations(audioDurationsObj);
        setLoading(false);
      });
    }
  }, [project]);

  if (!project) {
    return (
      <div className="w-screen overflow-hidden bg-dark-color-2 text-white h-screen">
        <h1>Project not found</h1>
      </div>
    );
  }

  const iconsList = [
    { id: 1, icon: <FaArrowRotateRight /> },
    { id: 2, icon: <FaArrowRotateLeft /> },
    { id: 3, icon: <FaCut /> },
    { id: 4, icon: <FaPaste /> },
    { id: 5, icon: <HiOutlineClipboardDocument /> },
    { id: 6, icon: <VscSplitHorizontal /> },
    { id: 7, icon: <RiZoomInFill /> },
    { id: 8, icon: <progress /> },
    { id: 9, icon: <RiZoomOutFill /> },
  ];

  const selectOptions = [
    { percentage: "25%" },
    { percentage: "50%" },
    { percentage: "75%" },
    { percentage: "100%" },
  ];

  const handleExport = ()=>{
    navigate("/")
  }
  return (
    <div className="w-full h-full bg-dark-color text-gray-color">
      {/* main container */}
      <div className="flex flex-col p-5">
        <div className="flex w-full gap-4  h-[400px]">
          {/* assets */}
          <div className="w-[25%] p-5 flex flex-col gap-2 bg-dark-color-2 rounded-md overflow-y-auto">
            <div className="flex justify-between items-center">
              <p className="text-xs xl:text-lg lg:text-lg md:text-md">Assets</p>
              <div>
                <input
                  type="file"
                  ref={fileUploadRef}
                  style={{ display: "none" }}
                />
                <IoIosAddCircle
                  onClick={handleUpload}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-row mt-3 flex-wrap justify-start gap-3">
              {project.clips ? (
                <>
                  {project.clips.map((clip) => (
                    <div key={clip.id}>
                      <video
                        controlsList="nodownload"
                        className="w-32 h-[5.5rem] rounded-md"
                      >
                        <source src={clip.src} type="video/mp4" />
                      </video>
                      <p className="text-xs">
                        {clip.src.substring(clip.src.lastIndexOf("/") + 1)}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-500 w-[80%] bg-dark-color h-[30%] rounded-md"
                  onClick={handleFileInputClick}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                </div>
              )}
              {project.audioTracks ? (
                <>
                  {project.audioTracks.map((audio) => (
                    <div
                      key={audio.id}
                      className="flex w-32 h-[5.5rem] cursor-pointer bg-blue-600 rounded-md items-center justify-center flex-col gap-2"
                      onClick={() => {
                        playAudio(audio.src);
                      }}
                    >
                      <audio
                        controlsList="nodownload"
                        className="w-32 p-2"
                        ref={audioRef}
                      >
                        <source src={audio.src} type="audio/mp3" />
                      </audio>
                      <IoMdMusicalNote className="text-2xl" />
                      <p className="text-xs">
                        {audio.src.substring(audio.src.lastIndexOf("/") + 1)}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-500 w-[80%] bg-dark-color h-[30%] rounded-md"
                  onClick={handleFileInputClick}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-[55%] p-5 flex flex-col gap-2 bg-dark-color-2 rounded-md">
            <div className="w-[100%] h-[10%] flex items-center justify-center gap-5">
              <FaArrowPointer className="cursor-pointer hover:text-blue-300 transition-all"/> 
              <FaCropSimple className="cursor-pointer hover:text-blue-300 transition-all"/>
              <FaHandPaper className="cursor-pointer hover:text-blue-300 transition-all"/>
              <select className="w-fit text-xs bg-dark-color p-2 outline-none">
                {selectOptions.map((option, i) => (
                  <option key={i} value={option.percentage}>
                    {option.percentage}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[100%] h-[90%] flex justify-center items-center rounded-md border-2 border-white/10">
              {selectedClip && (
                <video
                  controls
                  controlsList="nodownload"
                  className="w-full h-full rounded-md"
                >
                  <source src={selectedClip} type="video/mp4" />
                </video>
              )}
              {!selectedClip && <p>Select a clip to preview</p>}
            </div>
          </div>
          <div className="w-[20%] p-5 flex flex-col overflow-y-auto gap-2 bg-dark-color-2 rounded-md">
            <div className="flex w-full justify-end">
              <button className="flex items-center gap-2 text-base text-white/90 px-2 py-1 bg-dark-color rounded-md" onClick={handleExport}>
                <FaUpload />
                Export
              </button>
            </div>
            <p className="text-md text-gray-200">Properties</p>
            <div className="flex flex-wrap">
              <div className="flex flex-wrap items-center gap-1 justify-between">
                <p className="text-[.8em] w-12">Scale</p>
                <input
                  type="range"
                  className="h-12"
                  name="scale"
                  min="0"
                  value={propertiseData.scale}
                  onChange={handleChange}
                  max="100"
                />
                <p className="text-[.8em] w-12 p-2 text-center bg-dark-color rounded-md">
                  {propertiseData.scale} %
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1 justify-between">
                <p className="text-[.8em] w-12">Opacity</p>
                <input
                  type="range"
                  className="h-12"
                  name="opacity"
                  min="0"
                  max="100"
                  value={propertiseData.opacity}
                  onChange={handleChange}
                />
                <p className="text-[.8em] w-12 p-2 text-center bg-dark-color rounded-md">
                  {propertiseData.opacity} %
                </p>
              </div>
              <div className="flex justify-between w-[90%] mt-3">
                <p>Rotation</p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <FaArrowRotateRight />
                    <p>Z</p>
                    <p className="text-[.8em] w-12 p-2 text-center bg-dark-color rounded-md">
                      0.0
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaArrowRotateRight />
                    <p>Y</p>
                    <p className="text-[.8em] w-12 p-2 text-center bg-dark-color rounded-md">
                      0.0
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaArrowRotateRight />
                    <p>X</p>
                    <p className="text-[.8em] w-12 p-2 text-center bg-dark-color rounded-md">
                      0.0
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-[90%] mt-3 border-t-2 border-white/30 pt-3">
                <p>Position</p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[.8em]">X</p>
                    <p className="text-[.8em] w-12 p-2 text-center bg-dark-color rounded-md">
                      0.0
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[.8em]">Y</p>
                    <p className="text-[.8em] w-12 p-2 text-center bg-dark-color rounded-md">
                      0.0
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[.8em]">Z</p>
                    <p className="text-[.8em] w-12 p-2 text-center bg-dark-color rounded-md">
                      0.0
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-5">
        <div className="flex items-center gap-3 py-2 justify-center rounded-md bg-dark-color-2 text-2xl">
          <IoPlayBackCircle />
          <IoIosPlayCircle />
          <IoPlayForwardCircle />
          <progress />
        </div>
      </div>
      <div className="flex w-full flex-col bg-dark-color p-5">
        <div className="flex gap-3 bg-dark-color-2 p-5 w-full rounded-md">
          {iconsList.map((icon) => (
            <div
              key={icon.id}
              className="text-md cursor-pointer text-gray-400 transition-all hover:text-gray-200"
            >
              {icon.icon}
            </div>
          ))}
        </div>
        {project.clips ? (
          <>
            {project.clips.map((clip) => (
              <div className="my-2 bg-dark-color-2 flex gap-4 p-2 rounded-md">
                <div className="flex w-[15%] lg:w-[10%] justify-between items-center gap-3 border-r-2 border-gray-500 pr-2">
                  <span className="text-[.9em]  text-blue-300">
                    {" "}
                    {clip.src.substring(clip.src.lastIndexOf("/") + 1)}
                  </span>
                  <div className="flex flex-col gap-3 text-xs">
                    <FaEye />
                    <FaLock />
                  </div>
                </div>
                <div className="w-[85%] lg:w-[90%]">
                  <p>{durations[clip.id]}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="my-2 bg-dark-color-2 flex gap-4 p-2 rounded-md">
              <div className="flex w-[15%] justify-between items-center gap-3 border-r-2 border-gray-500 pr-2">
                <span className="text-[.9em]  text-blue-300"></span>
                <div className="flex flex-col gap-3 text-xs">
                  <FaEye />
                  <FaLock />
                </div>
              </div>
              <div className="w-[85%]">
                <p>{durations[clip.id]}</p>
              </div>
            </div>
          </>
        )}
        {project.audioTracks ? (
          <>
            {project.audioTracks.map((audio) => (
              <div
                key={audio.id}
                className="my-2 bg-dark-color-2 flex gap-4 p-2 rounded-md"
              >
                <div className="flex lg:w-[10%] w-[15%] justify-between items-center gap-3 border-r-2 border-gray-500 pr-2">
                  <span className="text-[.9em]  text-blue-300">
                    {audio.src.substring(audio.src.lastIndexOf("/") + 1)}{" "}
                  </span>
                  <div className="flex flex-col gap-3 text-xs">
                    <FaEye />
                    <FaLock />
                  </div>
                </div>
                <div className="lg:w-[90%] w-[90%]">
                  <p>{audioDurations[audio.id]}</p> {/* Corrected line */}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="my-2 bg-dark-color-2 flex gap-4 p-2 rounded-md">
              <div className="flex w-[15%] justify-between items-center gap-3 border-r-2 border-gray-500 pr-2">
                <span className="text-[.9em]  text-blue-300"></span>
                <div className="flex flex-col gap-3 text-xs">
                  <FaEye />
                  <FaLock />
                </div>
              </div>
              <div className="w-[85%]">
                <p>{durations[audio.id]}</p> {/* Corrected line */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoEdit;
