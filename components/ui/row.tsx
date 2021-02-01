import { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import Props from "../../utils/defaultProps";

interface RowProps extends Props {
  props?: HTMLAttributes<HTMLDivElement>;
  className?: string;
}

type DivRef = ForwardedRef<HTMLDivElement>;

const Row = forwardRef(
  ({ className, children, ...props }: RowProps, ref: DivRef) => (
    <div className={`${className} row`} {...props} ref={ref}>
      {children}
    </div>
  )
);

export default Row;
