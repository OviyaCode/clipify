import React from "react";

const Timeline = ({ clips, audioTracks }) => {

  return (
    <div className="w-full h-16 bg-dark-color text-gray-color flex items-center p-5">
      <div className="w-full flex items-center">
        {clips &&
          clips.map((clip) => (
            <div key={clip.id} className="w-4 h-4 mr-2 bg-white rounded-full" />
          ))}

        {audioTracks &&
          audioTracks.map((audio) => (
            <div key={audio.id} className="w-4 h-4 mr-2 bg-blue-600 rounded-full" />
          ))}

        <div className="flex-1 ml-2">
          <div className="text-xs">
            {/* {getTimeString(currentTime)} / {getTimeString(duration)} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;