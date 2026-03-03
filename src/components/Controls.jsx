const Controls = ({
  text,
  onTextChange,
  onFontSizeChange,
  onSubmit,
  lineSpeed,
  onLineSpeedChange,
    blurRadius,
    fontSize,
    onBlurRadiusChange,
}) => {
  return (
    <div className="inputs" style={{ position: "fixed", bottom: "16px" }}>
      <form onSubmit={onSubmit}>
        <input placeholder="Enter text"  value={text} onChange={onTextChange} />
        <input
          placeholder="Enter font size"
          type="number"
          min={12}
          value={fontSize}
          onChange={onFontSizeChange}
        />
        <input
          placeholder="Enter speed"
          type="number"
          value={lineSpeed}
          onChange={onLineSpeedChange}
          max={400}
          min={0}
        />
        <input
            placeholder="Enter blur value"
            type="number"
            step="0.25"
            max={100}
            min={0}
            value={blurRadius}
            onChange={onBlurRadiusChange}
        />
      </form>
    </div>
  );
};






export default Controls;
