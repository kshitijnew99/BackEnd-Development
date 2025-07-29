import FaceMoodDetector from "./components/FaceMoodDetector";
import MoodSong from "./components/MoodSong";
import './index.scss';

const App = () => {
  return (
    <div className="container">
      <div className="header">Live Mood Detection</div>
      <FaceMoodDetector />
      <MoodSong />

      
    </div>
  );
};

export default App;
