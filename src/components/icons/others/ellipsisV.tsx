import { IconProps } from '../icon.interface';

const EllipsisVIcon = ({ size, className, space }: IconProps) => (
  <div style={{ transform: `translateY(${space}px)` }}>
    <svg
      height={size}
      width={size}
      className={`${className} flex-no-shrink fill-current`}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 192 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" />
    </svg>
  </div>
);

export default EllipsisVIcon;
