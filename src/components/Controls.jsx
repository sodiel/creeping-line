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
  selectedThemeIndex,
  onThemeChange,
  colorSchemes,
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
      padding: "14px 16px",
      boxShadow: `0 0 1em ${accentColor}`,
      mixBlendMode: `normal`,

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
      margin: "2px 2px",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "flex-end",
      gap: "12px",
    },
    controlGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    caption: {
      color: accentColor,
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.7px",
      textTransform: "uppercase",
      paddingLeft: "4px",
    },
    input: {
      background: baseColor,
      color: accentColor,
      border: `1px solid ${accentColor}`,
      padding: "10px 12px",
      minWidth: "132px",
      outline: "none",
      fontSize: "14px",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    },
    button: {
      background: baseColor,
      color: accentColor,
      border: `1px solid ${accentColor}`,
      padding: "10px 14px",
      fontWeight: 700,
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: "0.4px",
    },
    checkboxRow: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      minHeight: "42px",
      padding: "0 4px",
    },
    checkboxLabel: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: accentColor,
      fontSize: "14px",
      padding: "6px 8px",
      userSelect: "none",
      border: `1px solid ${accentColor}`,
      background: `${accentColor}11`,
    },
    checkbox: {
      appearance: "none",
      width: "16px",
      height: "16px",
      border: `1px solid ${accentColor}`,
      background: "transparent",
      cursor: "pointer",
    },
    checkboxChecked: {
      background: accentColor,
      boxShadow: `inset 0 0 0 2px ${baseColor}`,
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
        <div style={styles.controlGroup}>
          <span style={styles.caption}>Text</span>
          <input
            placeholder="Enter text"
            value={text}
            onChange={onTextChange}
            style={styles.input}
          />
        </div>
        <div style={styles.controlGroup}>
          <span style={styles.caption}>Font size</span>
          <input
            type="number"
            min={12}
            value={fontSize}
            onChange={onFontSizeChange}
            style={styles.input}
          />
        </div>
        <div style={styles.controlGroup}>
          <span style={styles.caption}>Speed</span>
          <input
            type="number"
            value={lineSpeed}
            onChange={onLineSpeedChange}
            max={400}
            min={0}
            style={styles.input}
          />
        </div>
        <div style={styles.controlGroup}>
          <span style={styles.caption}>Blur</span>
          <input
            type="number"
            step="0.25"
            max={100}
            min={0}
            value={blurRadius}
            onChange={onBlurRadiusChange}
            style={styles.input}
          />
        </div>
        <div style={styles.controlGroup}>
          <span style={styles.caption}>Grid size</span>
          <input
            type="number"
            min={4}
            max={80}
            step={1}
            value={gridSize}
            onChange={onGridSizeChange}
            style={styles.input}
          />
        </div>
        <div style={styles.controlGroup}>
          <span style={styles.caption}>Theme</span>
          <select
            value={selectedThemeIndex}
            onChange={onThemeChange}
            style={styles.input}
          >
            {colorSchemes.map((scheme, index) => (
              <option key={`${scheme.name}-${index}`} value={index}>
                {scheme.name}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.controlGroup}>
          <span style={styles.caption}>Display</span>
          <div style={styles.checkboxRow}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showGrid}
                onChange={onGridToggle}
                style={{
                  ...styles.checkbox,
                  ...(showGrid ? styles.checkboxChecked : {}),
                }}
              />
              Show grid
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isUppercase}
                onChange={onUppercaseToggle}
                style={{
                  ...styles.checkbox,
                  ...(isUppercase ? styles.checkboxChecked : {}),
                }}
              />
              UPPER CASE
            </label>
          </div>
        </div>
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
