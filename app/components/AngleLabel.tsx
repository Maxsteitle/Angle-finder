import { motion } from 'framer-motion';

type AngleLabelProps = {
  angle: number;
  position: { x: number; y: number };
  isPanning: boolean;
  isVisibleWhilePanning?: boolean;
};

const AngleLabel = ({
  angle,
  position,
  isPanning,
  isVisibleWhilePanning = true
}: AngleLabelProps) => (
  <motion.div
    initial={
      isVisibleWhilePanning
        ? { opacity: 0, scale: 0.9 }
        : { opacity: 1, scale: 1 }
    }
    animate={
      isVisibleWhilePanning
        ? { opacity: isPanning ? 1 : 0, scale: isPanning ? 1 : 0.8 }
        : { opacity: isPanning ? 0 : 1, scale: isPanning ? 0.8 : 1 }
    }
    className="font-mono"
    style={{
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      width: 1,
      height: 1,
      x: position.x,
      y: position.y - 8, // lineheight
      fontSize: 12,
      lineHeight: '16px'
    }}>
    <div>{`${angle.toFixed(0)}°`}</div>
  </motion.div>
);

export default AngleLabel;
