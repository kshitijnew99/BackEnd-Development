import FaceMoodDetector from "./components/FaceMoodDetector";
import './index.scss';

const App = () => {
  return (
    <div className="container">
      <div className="header">Live Mood Detection</div>
      <FaceMoodDetector />

      <div className="recommended">
        <h3>Recommended Tracks</h3>

        {[
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
        ].map((track, index) => (
          <div key={index} className="track">
            <div className="details">
              <div className="title">{track.title}</div>
              <div className="artist">{track.artist}</div>
            </div>
            <div className="play-btn"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
