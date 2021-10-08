interface TogglerProps {
  toggle: () => void;
}

const Toggler = ({ toggle }: TogglerProps) => (
  <button
    className="block float-right pr-3 text-4xl focus:outline-none focus:shadow lg:hidden"
    onClick={toggle}
  >
    &#8801;
  </button>
);

export default Toggler;
