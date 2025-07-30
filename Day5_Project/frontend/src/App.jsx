import FaceMoodDetector from "./components/FaceMoodDetector";
import MoodSong from "./components/MoodSong";
import './index.scss';
import { useState } from "react";

const App = () => {

  const [Songs, setSongs] = useState([
          { title: "Sunrise Serenade", artist: "Ava Carter" },
          { title: "Midnight Groove", artist: "Ethan Blake" },
          { title: "Electric Pulse", artist: "Olivia Hayes" },
          { title: "Tranquil Echoes", artist: "Noah Bennett" },
          { title: "Rhythmic Heartbeat", artist: "Sophia Reed" },
          { title: "Dreamy Horizons", artist: "Liam Foster" },
          { title: "Urban Flow", artist: "Isabella Morgan" },
          { title: "Soulful Journey", artist: "Caleb Parker" },
          { title: "Cosmic Dance", artist: "Grace Ellis" },
          { title: "Velvet Nights", artist: "Owen Mitchell" },
        ])

  return (
    <div className="container">
      <div className="header">Live Mood Detection</div>
      <FaceMoodDetector setSongs={setSongs} />
      <MoodSong  Songs={Songs} />

      
    </div>
  );
};

export default App;
