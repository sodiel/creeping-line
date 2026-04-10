import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const CreepingLine = ({ fontSize, text, rawText, color, speed = 5, blurRadius }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const prevRawTextRef = useRef("");
  const positionRef = useRef(0);
  const speedRef = useRef(Math.max(0, toNumber(speed, 5)));
  const sizesRef = useRef({ containerWidth: 0, textWidth: 0 });

  const normalizedFontSize = Math.max(12, toNumber(fontSize, 30));
  const normalizedBlurRadius = Math.max(0, toNumber(blurRadius, 0));
  const normalizedText = String(text ?? "");
  const normalizedRawText = String(rawText ?? "");

  const applyPosition = useCallback((x) => {
    positionRef.current = x;
    if (!textRef.current) return;
    textRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
  }, []);

  const measure = useCallback(() => {
    if (!containerRef.current || !textRef.current) {
      return { containerWidth: 0, textWidth: 0 };
    }

    const next = {
      containerWidth: containerRef.current.clientWidth,
      textWidth: textRef.current.scrollWidth,
    };

    sizesRef.current = next;
    return next;
  }, []);

  useEffect(() => {
    speedRef.current = Math.max(0, toNumber(speed, 5));
  }, [speed]);

  useLayoutEffect(() => {
    const { containerWidth, textWidth } = measure();
    const rawTextChanged = prevRawTextRef.current !== normalizedRawText;
    prevRawTextRef.current = normalizedRawText;

    if (textWidth <= containerWidth) {
      applyPosition((containerWidth - textWidth) / 2);
      return;
    }

    // При вводе не допускаем сдвиг вправо: корректируемся только влево.
    // Важно: проверяем изменение rawText, а не displayText (чтобы при смене регистра позиция не прыгала)
    if (rawTextChanged) {
      const maxAllowedX = containerWidth - textWidth;
      applyPosition(Math.min(positionRef.current, maxAllowedX));
    }
  }, [normalizedRawText, normalizedFontSize, measure, applyPosition]);

  useEffect(() => {
    const updateOnResize = () => {
      const { containerWidth, textWidth } = measure();
      if (textWidth <= containerWidth) {
        applyPosition((containerWidth - textWidth) / 2);
      }
    };

    updateOnResize();
    window.addEventListener("resize", updateOnResize);

    let observer;
    if (containerRef.current && textRef.current) {
      observer = new ResizeObserver(updateOnResize);
      observer.observe(containerRef.current);
      observer.observe(textRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateOnResize);
      if (observer) observer.disconnect();
    };
  }, [measure, applyPosition]);

  useEffect(() => {
    const step = (time) => {
      const { containerWidth, textWidth } = sizesRef.current;

      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const deltaSeconds = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const shouldMove = textWidth > containerWidth && speedRef.current > 0;
      if (shouldMove) {
        let nextX = positionRef.current - speedRef.current * deltaSeconds;

        if (nextX + textWidth < 0) {
          nextX = containerWidth;
        }

        applyPosition(nextX);
      }

      frameRef.current = window.requestAnimationFrame(step);
    };

    frameRef.current = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      lastTimeRef.current = 0;
    };
  }, [applyPosition]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        minHeight: `${normalizedFontSize * 1.35}px`,
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        ref={textRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          whiteSpace: "pre",
          fontFamily: "PacManSenior-Regular",
          fontSize: `${normalizedFontSize}px`,
          color,
          filter: `blur(${normalizedBlurRadius}px)`,
          willChange: "transform",
        }}
      >
        {normalizedText}
      </span>
    </div>
  );
};

export default CreepingLine;
