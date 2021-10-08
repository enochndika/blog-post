import { IconProps } from '../icon.interface';

const PenIcon = ({ size, className, space }: IconProps) => (
  <div style={{ transform: `translateY(${space}px)` }}>
    <svg
      height={size}
      width={size}
      className={`${className} flex-no-shrink fill-current`}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z" />
    </svg>
  </div>
);

export default PenIcon;
