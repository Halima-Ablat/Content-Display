import React, { useEffect, useState } from "react";

function WindowResize() {

  const[width, setWidth] = useState(window.innerWidth);
  const[height, setHeight] = useState(window.innerHeight);

  function handleWindowChange(){
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
  window.addEventListener("resize", handleWindowChange)

  return () => {
    window.removeEventListener("resize", handleWindowChange)
  }
  }, [width, height])

  return (
    <div className="mt-3">
      <h2>Use Window resize Hook</h2>
      <div className="text-center">
        <p>Width is {width}px</p>
        <p>Height is {height}px</p>
      </div>
    </div>
  );
}

export default WindowResize;
