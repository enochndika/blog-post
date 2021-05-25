import Confetti from 'react-dom-confetti';
import { useEffect } from 'react';

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

export default function ConfettiButton({ active, setActive }) {
  let reset;

  useEffect(() => {
    if (active) {
      reset = setTimeout(() => setActive(false), 2000);
    }
    return () => {
      clearTimeout(reset);
    };
  }, [active]);
  return <Confetti active={active} config={config} />;
}
