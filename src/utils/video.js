import thumbnail1 from "../assets/video-src/video-thumbnails/thumbnail1.jpeg";
import brba from "../assets/video-src/videos/brba.mp4";
import cricket from "../assets/video-src/videos/cricket.mp4";
import naaReady from "../assets/video-src/audios/naa-ready.mp3";
const projects = [
  {
    id: "001",
    title: "My Favorites in 2023",
    thumbnail: thumbnail1,
    clips: [
      {
        id: 1,
        src: brba,
        start: 0,
        end: 10,
      },
      {
        id: 2,
        src: cricket,
        start: 10,
        end: 20,
      },
    ],
    audioTracks: [
      {
        id: 1,
        src: naaReady,
        start: 0,
        end: 30,
      },
    ],
  },
];
export default projects;