import React, { useState, useRef } from "react";
import clsx from "clsx";

const ProgressiveImage = ({ lowResSrc, highResSrc, alt }) => {
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [bgPosition, setBgPosition] = useState("center");
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBgPosition(`${x}% ${y}%`);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full h-auto group cursor-zoom-in"
      onMouseEnter={() => setIsZoomActive(true)}
      onMouseLeave={() => setIsZoomActive(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Low Res */}
      <img
        src={lowResSrc}
        alt={alt}
        className={clsx("w-[35rem] h-auto", { "opacity-0": isHighResLoaded })}
      />

      {/* High Res */}
      <img
        src={highResSrc}
        alt={alt}
        onLoad={() => setIsHighResLoaded(true)}
        className={clsx("w-[35rem] h-auto absolute top-0 left-0", {
          "opacity-0": !isHighResLoaded,
          "opacity-100": isHighResLoaded,
        })}
      />

      {/* Zoom Effect */}
      {isHighResLoaded && isZoomActive && (
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url(${highResSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "200%",
            backgroundPosition: bgPosition,
          }}
        />
      )}
    </div>
  );
};

export default ProgressiveImage;
