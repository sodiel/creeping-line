import { useState, useEffect, useRef } from "react";




const CreepingLine = ({ fontSize, text, color, speed = 5 }) => {
  const containerRef = useRef(null);
  const [capacity, setCapacity] = useState(0);

  const [buffer, setBuffer] = useState((text + "   ").split(""));
  const lastChangeTime = useRef(Date.now());

  useEffect(() => {
    const measureCapacity = () => {
      if (!containerRef.current) return;
      const span = document.createElement("span");
      span.style.fontSize = fontSize ;
      span.style.fontFamily = "monospace";
      span.style.visibility = "hidden";
      span.innerText = "W";

      document.body.appendChild(span);
      const charWidth = span.getBoundingClientRect().width;
      const containerWidth = containerRef.current.offsetWidth;
      document.body.removeChild(span);
      if (charWidth > 0) setCapacity(Math.floor(containerWidth / charWidth));
    };
    measureCapacity();
    const observer = new ResizeObserver(measureCapacity);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [fontSize]);

  useEffect(() => {
    setBuffer((text + "   ").split(""));
    lastChangeTime.current = Date.now();
  }, [text]);

  useEffect(() => {
    if (speed <= 0) return;

    const timeToSleep = 1000 / speed;

    const interval = setInterval(() => {
      if (text.length <= capacity) {
        return;
      }

      if (Date.now() - lastChangeTime.current < 1000) return;

      setBuffer((prev) => {
        const newBuffer = [...prev];
        const firstLetter = newBuffer[0];
        for (let i = 0; i < newBuffer.length - 1; i++) {
          newBuffer[i] = newBuffer[i + 1];
        }
        newBuffer[newBuffer.length - 1] = firstLetter;
        return newBuffer;
      });
    }, timeToSleep);

    return () => clearInterval(interval);
  }, [speed, capacity, text]);

  const screen = buffer.slice(0, capacity).join("");

  const style = {

    fontSize: fontSize +"px",
    color,

    fontFamily: "PacManSenior-Regular",
    whiteSpace: "pre",
    overflow: "hidden",


    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    margin: 0,
    padding: 0,
  }




  return (
      <div
          ref={containerRef}
          style={style}
      >
        {screen}
      </div>
  );
};

export default CreepingLine;
