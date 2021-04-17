import Props from '../../utils/defaultProps';

interface CardBodyProps extends Props {
  className?: string;
}

const style = {
  boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
};

export const Card = ({ children }: Props) => (
  <div className="relative flex flex-col rounded-lg" style={style}>
    {children}
  </div>
);

Card.Body = ({ children, className }: CardBodyProps) => (
  <div
    className={`block flex-grow flex-shrink ${className ? className : 'p-5'}`}
  >
    {children}
  </div>
);
