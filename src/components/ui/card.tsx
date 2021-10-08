import Props from '@/utils/defaultProps';

interface CardBodyProps extends Props {
  className?: string;
}

const style = {
  card: `relative flex flex-col border-2 border-gray-200 rounded-lg`,
  cardBody: `block flex-grow flex-shrink`,
  cardTitle: `font-medium text-gray-700 mb-3`,
  cardText: `text-gray-500`,
};

const inlineStyle = {
  boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
};

const Card = ({ children }) => (
  <div className={style.card} style={inlineStyle}>
    {children}
  </div>
);

Card.Body = ({ children, className }: CardBodyProps) => (
  <div className={`${style.cardBody} ${className ? className : 'p-5'}`}>
    {children}
  </div>
);

export default Card;
