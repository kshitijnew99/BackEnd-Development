import React, { useEffect, useRef } from 'react';

const MoodSong = ({ Songs }) => {
  const audioRefs = useRef([]);

  useEffect(() => {
    // Play the first track automatically (if available)
    if (audioRefs.current.length > 0 && audioRefs.current[0]) {
      const audio = audioRefs.current[0];
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay blocked:", error.message);
        });
      }
    }
  }, [Songs]);

  return (
    <div className="recommended">
      <h3>Recommended Tracks</h3>
      {Songs.map((track, index) => (
        <div key={index} className="track">
          <div className="details">
            <div className="title">{track.title}</div>
            <div className="artist">{track.artist}</div>
            <div className="mood">{track.mood}</div>
          </div>
          <div className="buttons">
            <audio
              className="audio-file"
              ref={el => (audioRefs.current[index] = el)}
              src={track.audio}
              controls
            />
            <i className="ri-pause-line"></i>
            <i className="ri-play-circle-fill"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSong;
