import { useEffect, useState } from "react";
import CreepingLine from "./components/creepingLine";
import Controls from "./components/Controls";
import "./App.css";
function App() {
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const [text, setText] = useState(loremIpsum);
  const [fontSize, setFontSize] = useState("92");
  const [blurRadius, setBlurRadius] = useState("2");
  const [lineSpeed, setLineSpeed] = useState(5);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onFullscreenChange() {
      const isFullscreenMode = Boolean(document.fullscreenElement) || 
                               (window.innerHeight === screen.height);
      setIsFullscreen(isFullscreenMode);
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);
    window.addEventListener("resize", onFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      window.removeEventListener("resize", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    setShowControls(!isFullscreen);
  }, [isFullscreen]);

  const handleChange = (event) => {
    const text = event.target.value;
    console.log(text);
    setText(text);
  };
  const handleFontChange = (event) => {
    const text = event.target.value;
    console.log(text);
    setFontSize(text );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSpeedChange = (event) => {
    const speed = event.target.value;
    console.log(speed);
    setLineSpeed(speed);
  };

  const handleBlurChange = (event) => {
    const blur = event.target.value;
    console.log(blur);
    setBlurRadius(blur);
  }

  return (
    <>
       {/*<div className="grid-overlay"></div>*/}
      <div className="creeping-line" style={{ filter: `blur(${blurRadius}px)` }}>
        <div className="grid-overlay"></div>
        <CreepingLine
            text={text}
            color="violet"
            fontSize={fontSize}
            speed={lineSpeed}
        />
        <CreepingLine
            text={text}
            color="magenta"
            fontSize={fontSize}
            speed={lineSpeed}
        />
        <CreepingLine
            text={text}
            color="purple"
            fontSize={fontSize}
            speed={lineSpeed}
        />




      </div>

      {showControls && (
        <Controls
          text={text}
          fontSize={fontSize}
          lineSpeed={lineSpeed}
          onTextChange={handleChange}
          onBlurRadiusChange={handleBlurChange}
          blurRadius={blurRadius}
          onFontSizeChange={handleFontChange}
          onLineSpeedChange={handleSpeedChange}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default App;
