import Props from '@/utils/defaultProps';

interface FlagProps extends Props {
  ariaLabel: string;
}

const Flag = ({ children, ariaLabel }: FlagProps) => (
  <span
    role="img"
    aria-label={ariaLabel}
    className="inline-block align-middle mr-2 text-2xl leading-4"
  >
    {children}
  </span>
);

const FranceFlag = () => <Flag ariaLabel="France">🇫🇷</Flag>;
const UsaFlag = () => <Flag ariaLabel="USA">🇺🇸</Flag>;

export { FranceFlag, UsaFlag };
