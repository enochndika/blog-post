import { IconProps } from '@/components/icons/icon.interface';

const PlusIcon = ({ size, className, space }: IconProps) => (
  <div style={{ transform: `translateY(${space}px)` }}>
    <svg
      height={size}
      width={size}
      className={`${className} flex-no-shrink fill-current`}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
    </svg>
  </div>
);

export default PlusIcon;
