import React from 'react'

const MoodSong = () => {
  return (
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
            <i  className="ri-play-line"></i>
          </div>
        ))}
    </div>
  )
}

export default MoodSong