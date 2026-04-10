import { useEffect, useState } from "react";
import useFullscreen from "./hooks/useFullscreen"
import CreepingLine from "./components/creepingLine";
import Controls from "./components/Controls";
import "./App.css";
function App() {
  const [text, setText] = useState("test");
  const [fontSize, setFontSize] = useState("48");
  const [lineSpeed, setLineSpeed] = useState(300);
  const [blurRadius, setBlurRadius] = useState(1.5);
  const { isFullscreen, toggleFullscreen } = useFullscreen();


const colorScheme = {
  baseColor: '#471f0e',
  accentColor: '#5fa82c',
};

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--base-color",
      colorScheme.baseColor
    );
  }, [colorScheme.baseColor]);

  const handleFullscreenToggle = () => {
    toggleFullscreen();
  }
  const handleChange = (event) => {
    const text = event.target.value;
    console.log(text);
    setText(text);
  };

  const handleFontChange = (event) => {
    const text = event.target.value;
    console.log(text);
    setFontSize(text);
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

    setBlurRadius(blur);
  };


  return (
    <>
       <div className="grid-overlay"></div>
      <div className="creeping-line">
        <CreepingLine
          text={text}
          color={colorScheme.accentColor}
          fontSize={fontSize}
          speed={lineSpeed}
          blurRadius={blurRadius}
        />
        <CreepingLine
          text={text}
          color={colorScheme.accentColor}
          fontSize={fontSize}
          speed={lineSpeed}
          blurRadius={blurRadius}
        />
        <CreepingLine
          text={text}
          color={colorScheme.accentColor}
          fontSize={fontSize}
          speed={lineSpeed}
          blurRadius={blurRadius}
        />
      </div>

      {(!isFullscreen) && (
        <Controls
          text={text}
          fontSize={fontSize}
          blurRadius={blurRadius}
          onBlurRadiusChange={handleBlurChange}
          lineSpeed={lineSpeed}
          onTextChange={handleChange}
          onFontSizeChange={handleFontChange}
          onLineSpeedChange={handleSpeedChange}
          onSubmit={handleSubmit}
          onFullscreenToggle={handleFullscreenToggle}
          colorScheme={colorScheme}
        />
      )}
    </>
  );
}

export default App;
