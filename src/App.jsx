import React from "react";
import {Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import VideoEdit from "./pages/VideoEdit";
import projects from "./utils/video";
import ProjectsContext from "./context/ProjectContext";
const App = () => {
  return (
    <ProjectsContext.Provider value={{ projects }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:id" element={<VideoEdit />} />
      </Routes>
    </ProjectsContext.Provider>
  );
};

export default App;
