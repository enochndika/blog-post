import React, { ReactElement, useState } from 'react';
import Props from '@/utils/defaultProps';

interface TabProps extends Props {
  selected?: boolean;
  title: string;
}

const style = {
  selected: `text-gray-700  border-b-2 border-indigo-700 dark:text-white -mb-2 px-4 text-lg py-4 md:py-1 inline-block`,
  notSelected: `-mb-2 px-4 text-lg dark:text-white py-4 md:py-1 inline-block border-b`,
};

export const Tabs = ({ children }: Props) => {
  const childrenArray: Array<any> = React.Children.toArray(children);
  const [current, setCurrent] = useState(childrenArray[0].key);
  const newChildren = childrenArray.map((child) =>
    React.cloneElement(child as ReactElement, {
      selected: child.key === current,
    }),
  );

  return (
    <nav>
      {childrenArray.map((child) => (
        <a
          onClick={() => setCurrent(child.key)}
          key={child.key}
          className={current === child.key ? style.selected : style.notSelected}
        >
          {child.props.title}
        </a>
      ))}
      <section>{newChildren}</section>
    </nav>
  );
};

export const Tab = ({ children, selected }: TabProps) => (
  <div hidden={!selected} className="mt-4">
    {children}
  </div>
);
