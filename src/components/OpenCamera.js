import axios from 'axios';
import jsQR from "jsqr";
import QRCodeLib from 'qrcode';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import '../Style.css';

function ImageUpload() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [cam, setCam] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleOpenCam = () => {
    setCam(prevCam => !prevCam);
  };

  const captureImg = useCallback( async() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const image = new Image();
        image.src = imageSrc;
        image.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            
            const imageUrl = await QRCodeLib.toDataURL(code.data);
            setQrData(imageUrl);
            console.log("Testing: ",imageUrl);

            try {
              const response = await axios.post('http://localhost:3001/item/updateitem', {
                imageUrl
              });
        
              if(response.status === 200){
                console.log("successfully working")
              }
              alert("QR Captured Successfully")
              navigate('/')
        
          } catch (error) {
              console.error(`Failed to save image: ${error.message}`);
          }

            
          } else {
            console.log("No QR code found.");
          }
        };
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (cam) {
      const interval = setInterval(captureImg, 1000);
      return () => clearInterval(interval);
    }
  }, [cam, captureImg]);

  return (
    <div className="image-upload-container">
      <div className="box-decoration" style={{ height: '100%', width: '30rem' }}>
        <label htmlFor="image-upload-input" className="image-upload-label">
          {cam ? "Align Your QR Code" : "Scan QR Code"}
        </label>
        {cam && (
          <Webcam
            audio={false}
            width={450}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
      )}
        <button className="image-upload-button" onClick={handleOpenCam}>
          {cam ? "Close Camera" : "Open Camera"}
        </button>
        
      </div>
    </div>
  );
}

export default ImageUpload;