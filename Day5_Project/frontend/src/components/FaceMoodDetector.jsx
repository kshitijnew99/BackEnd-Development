import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FaceMoodDetector = () => {
  const videoRef = useRef();

  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]);
        
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error accessing webcam:', err));
  };

  const detectHandler = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if(!detections || detections.length === 0){
      console.log("No face detected");
    }

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const mood = Object.entries(expressions).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      console.log('Current Mood:', mood);
    }
  };

  useEffect(() => {

      loadModels().then(startVideo); 

  }, []);

    

  

  return (
      <div className='facemood'>
        <video 
        className='video' 
        ref={videoRef} 
        autoPlay 
        muted 
        />
        <button  onClick={detectHandler} className='detect'>Detect</button>

      </div>
    );
};

export default FaceMoodDetector;
