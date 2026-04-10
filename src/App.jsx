import { useEffect, useState } from "react";
import useFullscreen from "./hooks/useFullscreen"
import CreepingLine from "./components/creepingLine";
import Controls from "./components/Controls";
import colorSchemes from "./assets/colorSchemes.json";
import "./App.css";

const DEFAULT_STATE = {
  rawText: "test",
  fontSize: "96",
  lineSpeed: 300,
  blurRadius: 3.5,
  showGrid: true,
  gridSize: 10,
  isUppercase: false,
  themeIndex: 0,
};

const STORAGE_KEY = "creepingLineState";

function App() {
  const [rawText, setRawText] = useState(DEFAULT_STATE.rawText);
  const [fontSize, setFontSize] = useState(DEFAULT_STATE.fontSize);
  const [lineSpeed, setLineSpeed] = useState(DEFAULT_STATE.lineSpeed);
  const [blurRadius, setBlurRadius] = useState(DEFAULT_STATE.blurRadius);
  const [showGrid, setShowGrid] = useState(DEFAULT_STATE.showGrid);
  const [gridSize, setGridSize] = useState(DEFAULT_STATE.gridSize);
  const [isUppercase, setIsUppercase] = useState(DEFAULT_STATE.isUppercase);
  const [themeIndex, setThemeIndex] = useState(DEFAULT_STATE.themeIndex);
  const [isHydrated, setIsHydrated] = useState(false);
  const { isFullscreen, toggleFullscreen } = useFullscreen();


const colorScheme = colorSchemes[themeIndex] ?? colorSchemes[0];

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        setRawText(state.rawText ?? DEFAULT_STATE.rawText);
        setFontSize(state.fontSize ?? DEFAULT_STATE.fontSize);
        setLineSpeed(state.lineSpeed ?? DEFAULT_STATE.lineSpeed);
        setBlurRadius(state.blurRadius ?? DEFAULT_STATE.blurRadius);
        setShowGrid(state.showGrid ?? DEFAULT_STATE.showGrid);
        setGridSize(state.gridSize ?? DEFAULT_STATE.gridSize);
        setIsUppercase(state.isUppercase ?? DEFAULT_STATE.isUppercase);
        setThemeIndex(state.themeIndex ?? DEFAULT_STATE.themeIndex);
      }
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);


  useEffect(() => {
    if (!isHydrated) return;
    const state = {
      rawText,
      fontSize,
      lineSpeed,
      blurRadius,
      showGrid,
      gridSize,
      isUppercase,
      themeIndex,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }, [rawText, fontSize, lineSpeed, blurRadius, showGrid, gridSize, isUppercase, themeIndex, isHydrated]);


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
    setRawText(text);
  };

  const handleFontChange = (event) => {
    const text = event.target.value;
    setFontSize(text);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSpeedChange = (event) => {
    const speed = event.target.value;
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

  const handleThemeChange = (event) => {
    const nextThemeIndex = Number(event.target.value);
    if (!Number.isInteger(nextThemeIndex)) return;
    if (nextThemeIndex < 0 || nextThemeIndex >= colorSchemes.length) return;
    setThemeIndex(nextThemeIndex);
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
          rawText={rawText}
          color={colorScheme.accentColor}
          fontSize={fontSize}
          speed={lineSpeed}
          blurRadius={blurRadius}
        />
        <CreepingLine
          text={text}
          rawText={rawText}
          color={colorScheme.accentColor}
          fontSize={fontSize}
          speed={lineSpeed}
          blurRadius={blurRadius}
        />
        <CreepingLine
          text={text}
          rawText={rawText}
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
          selectedThemeIndex={themeIndex}
          onThemeChange={handleThemeChange}
          colorSchemes={colorSchemes}
          onSubmit={handleSubmit}
          onFullscreenToggle={handleFullscreenToggle}
          colorScheme={colorScheme}
        />
      )}
    </>
  );
}

export default App;
