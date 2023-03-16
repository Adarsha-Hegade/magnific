import React, { useEffect, useRef } from "react";

const CameraView = () => {
  const videoRef = useRef(null);

  const startVideo = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((error) => console.error("Error accessing camera:", error));
    }
  };

  useEffect(() => {
    startVideo();
  }, []);

  return (
    <div className="video-container">
      <video ref={videoRef} />
    </div>
  );
};

export default CameraView;
