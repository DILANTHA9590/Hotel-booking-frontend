import { useState } from "react";

export default function ImageSlider(props) {
  const image = props.allImages;
  const [activeImage, setActiveImage] = useState(0);
  return (
    <>
      <div className="">
        {image ? (
          <img src={image[activeImage]} alt="Room Image" />
        ) : (
          <h1 className="text-black">🖼️ No image available at the moment</h1>
        )}
        <div className="h-[100px] bg-white flex sm:justify-evenly backdrop-blur-2xl overflow-hidden justify-between cursor-pointer">
          {image.map((img, index) => (
            <img
              key={index}
              src={img}
              onMouseMove={() => setActiveImage(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
