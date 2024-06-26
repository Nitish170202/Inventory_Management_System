import React from 'react';

function SampleApp() {
    const [image, setImage] = useState(null);

  const handleCapture = (imageSrc) => {
    setImage(imageSrc);
    console.log(image);
  };

  return (
    <div className="App">
      <h1>Image Scanner</h1>
      <WebcamCapture onCapture={handleCapture} />
      {/* {image && <ImageDetails imageSrc={image} />} */}
    </div>
  );
};

export default SampleApp