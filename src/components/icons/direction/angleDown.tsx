import { IconProps } from '../icon.interface';

const AngleDownIcon = ({ size, className, space }: IconProps) => (
  <div style={{ transform: `translateY(${space}px)` }}>
    <svg
      height={size}
      width={size}
      className={`${className} flex-no-shrink fill-current`}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 320 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
    </svg>
  </div>
);

export default AngleDownIcon;
