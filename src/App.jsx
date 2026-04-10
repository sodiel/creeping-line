import { useEffect, useState } from "react";
import useFullscreen from "./hooks/useFullscreen"
import CreepingLine from "./components/creepingLine";
import Controls from "./components/Controls";
import "./App.css";
function App() {
  const [rawText, setRawText] = useState("test");
  const [fontSize, setFontSize] = useState("96");
  const [lineSpeed, setLineSpeed] = useState(300);
  const [blurRadius, setBlurRadius] = useState(3.5);
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize, setGridSize] = useState(10);
  const [isUppercase, setIsUppercase] = useState(false);
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
    setRawText(text);
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

  const handleGridSizeChange = (event) => {
    const nextSize = Number(event.target.value);
    if (!Number.isFinite(nextSize)) return;
    setGridSize(Math.max(4, Math.min(80, nextSize)));
  };

  const handleGridToggle = (event) => {
    setShowGrid(event.target.checked);
  };

  const handleUppercaseToggle = (event) => {
    setIsUppercase(event.target.checked);
  };

  const text = isUppercase ? rawText.toUpperCase() : rawText;


  return (
    <>
      {showGrid && (
        <div
          className="grid-overlay"
          style={{ "--grid-size": `${gridSize}px` }}
        ></div>
      )}
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
          text={rawText}
          fontSize={fontSize}
          blurRadius={blurRadius}
          onBlurRadiusChange={handleBlurChange}
          lineSpeed={lineSpeed}
          onTextChange={handleChange}
          onFontSizeChange={handleFontChange}
          onLineSpeedChange={handleSpeedChange}
          showGrid={showGrid}
          onGridToggle={handleGridToggle}
          gridSize={gridSize}
          onGridSizeChange={handleGridSizeChange}
          isUppercase={isUppercase}
          onUppercaseToggle={handleUppercaseToggle}
          onSubmit={handleSubmit}
          onFullscreenToggle={handleFullscreenToggle}
          colorScheme={colorScheme}
        />
      )}
    </>
  );
}

export default App;
