import React, { useState, useRef, useEffect } from "react";

const Controls = ({
  text,
  onTextChange,
  fontSize,
  onFontSizeChange,
  lineSpeed,
  onLineSpeedChange,
  blurRadius,
  onBlurRadiusChange,
  showGrid,
  onGridToggle,
  gridSize,
  onGridSizeChange,
  isUppercase,
  onUppercaseToggle,
  onSubmit,
  onFullscreenToggle,
  colorScheme,
}) => {

  const { baseColor, accentColor } = colorScheme;

  const styles = {
    wrapper: {
      position: "fixed",
      left: "50%",
      bottom: "16px",
      transform: "translateX(-50%)",
      background: baseColor,
      border: `1px solid ${colorScheme.accentColor}`,
      borderRadius: "14px",
      padding: "14px 16px",
      boxShadow: `0 8px 30px rgba(0,0,0,0.45), 0 0 16px ${accentColor}33`,
      backdropFilter: "blur(8px)",
      zIndex: 1000,
      width: "min(96vw, 980px)",
      cursor: "default",
    },
    dragHandle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "20px",
      cursor: "grab",
      marginBottom: "10px",
    },
    dotRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    dot: {
      width: "4px",
      height: "4px",
      backgroundColor: accentColor,
      borderRadius: "50%",
      margin: "2px 2px",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    input: {
      background: baseColor,
      color: "#f5f5f5",
      border: `1px solid ${accentColor}`,
      borderRadius: "10px",
      padding: "10px 12px",
      minWidth: "140px",
      outline: "none",
      fontSize: "14px",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    },
    button: {
      background: baseColor,
      color: accentColor,
      border: `1px solid ${accentColor}`,
      borderRadius: "10px",
      padding: "10px 14px",
      fontWeight: 700,
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: "0.4px",
      boxShadow: `0 4px 14px ${accentColor}55`,
    },
    checkboxLabel: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "#f5f5f5",
      fontSize: "14px",
      padding: "0 6px",
      userSelect: "none",
    },
    checkbox: {
      accentColor,
      cursor: "pointer",
    },
  };

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef();

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialPosition({ x: position.x, y: position.y });
    setDragStart({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        setPosition({ x: initialPosition.x + deltaX, y: initialPosition.y + deltaY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart, initialPosition]);

  return (
    <div
      ref={wrapperRef}
      style={{
        ...styles.wrapper,
        transform: `translateX(calc(-50% + ${position.x}px)) translateY(${position.y}px)`,
      }}
    >
      <div style={styles.dragHandle} onMouseDown={handleMouseDown}>
        <div style={styles.dotRow}>
          <div style={styles.dot}></div>
          <div style={styles.dot}></div>
          <div style={styles.dot}></div>
        </div>
        <div style={styles.dotRow}>
          <div style={styles.dot}></div>
          <div style={styles.dot}></div>
          <div style={styles.dot}></div>
        </div>
      </div>
      <form onSubmit={onSubmit} style={styles.form}>
        <input
          placeholder="Enter text"
          value={text}
          onChange={onTextChange}
          style={styles.input}
        />
        <input
          placeholder="Enter font size"
          type="number"
          min={12}
          value={fontSize}
          onChange={onFontSizeChange}
          style={styles.input}
        />
        <input
          placeholder="Enter speed"
          type="number"
          value={lineSpeed}
          onChange={onLineSpeedChange}
          max={400}
          min={0}
          style={styles.input}
        />
        <input
          placeholder="Enter blur value"
          type="number"
          step="0.25"
          max={100}
          min={0}
          value={blurRadius}
          onChange={onBlurRadiusChange}
          style={styles.input}
        />
        <input
          placeholder="Grid size"
          type="number"
          min={4}
          max={80}
          value={gridSize}
          onChange={onGridSizeChange}
          style={styles.input}
        />
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={showGrid}
            onChange={onGridToggle}
            style={styles.checkbox}
          />
          Show grid
        </label>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isUppercase}
            onChange={onUppercaseToggle}
            style={styles.checkbox}
          />
          UPPER CASE
        </label>
        <button
          onClick={onFullscreenToggle}
          type="submit"
          style={styles.button}
        >
          fullscreen mode
        </button>
      </form>
    </div>
  );
};

export default Controls;
