import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import '../Style.css';

function ImageUpload() {
    const navigate = useNavigate();
  const [cam,setCam] = useState(false)

 

  const handelOpenCam = (event) => {
    if(cam == true){
        setCam(false)
    }else{
        setCam(true)
    }
    
  };

  return (
    <div className="image-upload-container">
        <div className="box-decoration" style={{height:'100%' , width:'30rem'}}>
        <label htmlFor="image-upload-input" className="image-upload-label">
          {cam ? "Allign Your Image" : "Scan QR Code"}
        </label>
        {cam ? <Webcam
                audio={false}
                width={450}
                screenshotFormat="image/jpeg">

                </Webcam>:""}

        <button className="image-upload-button" onClick={handelOpenCam}>
          {cam ? "Close Camera" : "Open Camera"}
        </button>
    </div>
    </div>
  );
}

export default ImageUpload;



/*
const qrCodeBase64 = await QRCodeLib.toDataURL(qrData);
setQrCodeBase64(qrCodeBase64);
*/