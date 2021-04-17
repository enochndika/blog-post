import Props from '../../utils/defaultProps';

interface FlagProps extends Props {
  ariaLabel: string;
}

const Flag = ({ children, ariaLabel }: FlagProps) => (
  <span
    role="image"
    aria-label={ariaLabel}
    className="mr-2 inline-block text-2xl leading-4 align-middle"
  >
    {children}
  </span>
);

export const FranceFlag = () => <Flag ariaLabel="France">🇫🇷</Flag>;

export const UsaFlag = () => <Flag ariaLabel="USA">🇺🇸</Flag>;
