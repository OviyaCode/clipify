import React, { useState } from 'react';
import videoData from './video.js';

const useVideoData = () => {
  const [videos, setVideos] = useState(videoData);


  return { videos };
};

export default useVideoData;
