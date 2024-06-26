import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
 
import '../Style.css';



function ImageUpload() {
    const navigate = useNavigate();
    const [imageUrl,setImageUrl] = useState()
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);


  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImageUrl(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleImageChange =  async(event) => {
    const file = event.target.files[0];
    const result = await getBase64(file);
    console.log("mera result : ",result)
    const imgname = event.target.files[0].name;
    setImageUrl(imgname)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleUploadButtonClick =async () => {
    try {
      const response = await axios.post('http://localhost:3001/item/updateitem', {
          imageUrl
      });

      if(response.status === 200){
        console.log("successfully working")
      }
      navigate('/')

  } catch (error) {
      console.error(`Failed to save image: ${error.message}`);
  }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="image-upload-container">
      <div className="box-decoration" style={{height:'100%' , width:'30rem'}}>
        <label htmlFor="image-upload-input" className="image-upload-label">
          {image ? "Your Image" : "Upload QR Code"}
        </label>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="upload image" className="img-display-after" />
          ) : (
            <img src="./photo.png" alt="..." className="img-display-before" />
          )}

          <input
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>

        <button
          className="image-upload-button"
          onClick={handleUploadButtonClick}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
