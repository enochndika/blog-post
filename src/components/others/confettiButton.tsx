import { useEffect, useRef } from 'react';
import Confetti from 'react-dom-confetti';

const config = {
  angle: 180,
  spread: 360,
  startVelocity: 40,
  elementCount: 100,
  dragFriction: 0.12,
  duration: 2000,
  stagger: 4,
  width: '10px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

const ConfettiButton = ({ active, setActive }) => {
  const reset = useRef(null);

  useEffect(() => {
    if (active) {
      reset.current = setTimeout(() => setActive(false), 2000);
    }
    return () => {
      clearTimeout(reset.current);
    };
  }, [active, setActive]);

  return <Confetti active={active} config={config} />;
};

export default ConfettiButton;
