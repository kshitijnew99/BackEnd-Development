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
              <div className="mood">{track.mood}</div>
            </div>
            <div className="buttons">
              <audio className='audio-file' src={track.audio}  controls></audio>
              <i class="ri-pause-line"></i>
              <i class="ri-play-circle-fill"></i>
            </div>
          </div>
        ))}
    </div>
  )
}

export default MoodSong