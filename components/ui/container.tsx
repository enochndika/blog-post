import { ReactNode, HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  children: ReactNode;
}

const Container = ({ children, noPadding, ...props }: ContainerProps) => (
  <div
    {...props}
    className={`container-fluid ${noPadding ? "" : "lg:px-container"}`}
  >
    {children}
  </div>
);

export default Container;
