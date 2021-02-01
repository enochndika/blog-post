import React, { ReactElement, useState } from "react";
import Props from "../../utils/defaultProps";

interface TabProps extends Props {
  selected?: boolean;
  title: string;
}

export const Tabs = ({ children }: Props) => {
  const childrenArray: Array<any> = React.Children.toArray(children);
  const [current, setCurrent] = useState(childrenArray[0].key);
  const newChildren = childrenArray.map((child) =>
    React.cloneElement(child as ReactElement, {
      selected: child.key === current,
    })
  );

  return (
    <nav>
      {childrenArray.map((child) => (
        <div
          role="button"
          onClick={() => setCurrent(child.key)}
          key={child.key}
          className={
            current === child.key
              ? "text-gray-700  border-b-2 border-indigo-700 dark:text-white -mb-2 px-4 text-lg py-4 md:py-1 inline-block"
              : "-mb-2 px-4 text-lg dark:text-white py-4 md:py-1 inline-block border-b"
          }
        >
          {child.props.title}
        </div>
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
