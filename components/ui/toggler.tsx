interface TogglerProps {
  toggle: () => void;
}

export const Toggler = ({ toggle }: TogglerProps) => (
  <button
    className="float-right block pr-3 text-4xl focus:outline-none focus:shadow lg:hidden "
    onClick={toggle}
  >
    &#8801;
  </button>
);
