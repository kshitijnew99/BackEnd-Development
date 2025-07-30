import React from 'react'

const MoodSong = ({Songs}) => {
  return (
    <div className="recommended">
        <h3>Recommended Tracks</h3>
        {Songs.map((track, index) => (
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