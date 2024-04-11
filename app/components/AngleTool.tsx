import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AngleLabel from './AngleLabel';

type AngleToolProps = {
  diameter?: number;
  degrees?: number;
  strokeWidth?: number;
  knobSize?: number;
  innerArcPercentage?: number;
  left?: number;
  top?: number;
  showBorder?: boolean;
  entryAnimation?: boolean;
};

const AngleTool = ({
  diameter = 300,
  degrees = 45,
  strokeWidth = 4,
  knobSize = 16,
  innerArcPercentage = 0.25,
  left,
  top,
  showBorder = false,
  entryAnimation = true
}: AngleToolProps) => {
  const radius = diameter / 2;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [angle, setAngle] = useState(degrees);
  const [knobPosition, setKnobPosition] = useState({
    x: diameter - knobSize / 2,
    y: radius - knobSize / 2
  });
  const [angleTextPosition, setAngleTextPosition] = useState({
    innerTextPosition: { x: 0, y: 0 },
    outerTextPosition: { x: 0, y: 0 }
  });

  const handlePanStart = () => setIsPanning(true);
  const handlePanEnd = () => setIsPanning(false);

  const getInnerAngleTextPosition = (
    angle: number
  ): { x: number; y: number } => {
    const bisectorAngleRadians = (angle / 2) * (Math.PI / 180);
    const textRadius = radius * innerArcPercentage + 16;
    return {
      x: radius + Math.cos(bisectorAngleRadians) * textRadius,
      y: radius - Math.sin(bisectorAngleRadians) * textRadius
    };
  };

  const updateKnobPosition = (angle: number) => {
    const correctedAngle = 360 - (angle % 360);
    const radians = (correctedAngle * Math.PI) / 180;
    const x = radius + Math.cos(radians) * radius - knobSize / 2;
    const y = radius + Math.sin(radians) * radius - knobSize / 2;

    const innerTextPosition = getInnerAngleTextPosition(angle);
    const outerTextOffset = radius + knobSize / 2 + 20;
    const outerTextPosition = {
      x: radius + Math.cos(radians) * outerTextOffset,
      y: radius + Math.sin(radians) * outerTextOffset
    };

    setKnobPosition({ x, y });
    setAngleTextPosition({ innerTextPosition, outerTextPosition });
  };

  const handleKnobPan = (event: MouseEvent) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current?.getBoundingClientRect();
      const center = {
        x: left + radius,
        y: top + radius
      };
      const x = event.x - center.x;
      const y = event.y - center.y;
      const radians = Math.atan2(-y, x);
      const newAngle = (radians * (180 / Math.PI) + 360) % 360;

      setAngle(newAngle);
      updateKnobPosition(newAngle);
    }
  };

  const drawArc = (angle: number): string => {
    const fillRadius = radius * innerArcPercentage;
    const radians = (angle * Math.PI) / 180;
    const x0 = radius + fillRadius;
    const y0 = radius;
    const x1 = radius + fillRadius * Math.cos(radians);
    const y1 = radius - fillRadius * Math.sin(radians);
    const largeArcFlag = angle <= 180 ? '0' : '1';

    return `M ${radius},${radius} L ${x0},${y0} A ${fillRadius},${fillRadius} 0 ${largeArcFlag} 0 ${x1},${y1} Z`;
  };

  useEffect(() => {
    setAngle(degrees);
    updateKnobPosition(degrees);
    console.log(knobSize);
  }, [degrees, knobSize, innerArcPercentage]);

  return (
    <motion.div
      ref={containerRef}
      initial={
        entryAnimation ? { opacity: 0, scale: 0.9 } : { opacity: 0, scale: 1 }
      }
      animate={{ opacity: 1, scale: 1 }}
      style={{
        width: diameter,
        height: diameter,
        borderRadius: diameter,
        position: left || top ? 'absolute' : 'unset',
        border: showBorder ? '2px dashed lightgrey' : 'unset',
        boxSizing: 'content-box',
        left,
        top
      }}>
      <svg
        style={{
          width: diameter,
          height: diameter,
          position: 'absolute'
        }}>
        <path d={drawArc(angle)} fill="#aaa" />
        <path
          d={`M ${diameter},${radius}
           L ${radius},${radius}
           L ${knobPosition.x + knobSize / 2},${knobPosition.y + knobSize / 2}`}
          stroke={'black'}
          strokeWidth={strokeWidth}
          strokeLinejoin={'round'}
          fill={'none'}
        />
      </svg>

      <AngleLabel
        angle={angle}
        isPanning={isPanning}
        isVisibleWhilePanning={true}
        position={{
          x: angleTextPosition.outerTextPosition.x,
          y: angleTextPosition.outerTextPosition.y
        }}
      />
      <AngleLabel
        angle={angle}
        isPanning={isPanning}
        isVisibleWhilePanning={false}
        position={{
          x: angleTextPosition.innerTextPosition.x,
          y: angleTextPosition.innerTextPosition.y
        }}
      />

      <motion.div
        onMouseDown={handlePanStart}
        onMouseUp={handlePanEnd}
        onPanEnd={handlePanEnd}
        onPan={(event) => handleKnobPan(event)}
        whileTap={{ scale: 1.2 }}
        style={{
          height: knobSize,
          width: knobSize,
          borderRadius: knobSize,
          background: 'black',
          x: knobPosition.x,
          y: knobPosition.y,
          position: 'absolute'
        }}
        tabIndex={-1}
      />
    </motion.div>
  );
};

export default AngleTool;
