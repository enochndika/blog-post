import { useState, useRef } from 'react';
import Props from '@/utils/defaultProps';
import AngleUpIcon from '@/components/icons/direction/angleUp';
import AngleDownIcon from '@/components/icons/direction/angleDown';

interface CollapseProps extends Props {
  icon?: boolean;
}

const Collapse = ({ children, icon }: CollapseProps) => {
  const toggler = children[0];
  const main = children[1];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>();
  const style = isOpen ? { height: ref.current?.scrollHeight } : { height: 0 };

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div onClick={toggle}>
        {isOpen ? (
          <div className="flex">
            {toggler}
            {icon && <AngleUpIcon className="pl-3" size={18} space={3} />}
          </div>
        ) : (
          <div className="flex">
            {toggler}
            {icon && <AngleDownIcon size={18} className="pl-3" space={3} />}
          </div>
        )}
      </div>
      <div
        className="transition-height ease pt-2 overflow-hidden duration-300"
        ref={ref}
        style={style}
      >
        {main}
      </div>
    </>
  );
};

export default Collapse;
