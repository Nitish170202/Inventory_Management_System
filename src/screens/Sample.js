import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";

const QRScanner = ({ onCapture }) => {
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
    }, [webcamRef, onCapture]);
  
    return (
      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
        />
        <button onClick={capture}>Capture photo</button>
      </div>
    );
  };

export default QRScanner;

