import { Header } from "./header";
import { useState } from "react";
import { Footer } from "../footer";
import { SidenavContainer } from "../sidenavContainer";
import Props from "../../../utils/defaultProps";

const DefaultLayout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(true);
  };

  return (
    <>
      <SidenavContainer isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={
          isOpen ? "fixed z-20 w-screen h-screen bg-black opacity-50" : ""
        }
      />
      <div className={isOpen ? "fixed overflow-y-hidden w-full" : ""}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
