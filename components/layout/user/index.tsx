import { ComponentType, Fragment, useState } from "react";
import { Separator } from "../../separator";
import { Footer } from "../footer";
import dynamic from "next/dynamic";
import { useMounted } from "../../../utils/mounted";
import { Header } from "../default/header";
import { useAuthenticated } from "../../../auth/useUser";
import Props from "../../../utils/defaultProps";
import { SidenavContainerProps } from "../sidenavContainer";

const SidenavContainer: ComponentType<SidenavContainerProps> = dynamic(
  () => import("../sidenavContainer").then((mod) => mod.SidenavContainer),
  {
    ssr: false,
  }
);

const UserLayout = ({ children }: Props) => {
  const isMounted = useMounted();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthenticated();

  const toggle = () => {
    setIsOpen(true);
  };

  return (
    <Fragment>
      {isAuthenticated && isMounted && (
        <Fragment>
          <SidenavContainer isOpen={isOpen} setIsOpen={setIsOpen} />
          <div
            className={
              isOpen ? "fixed z-20 w-screen h-screen bg-black opacity-50" : ""
            }
          />
          <div className={isOpen ? "fixed overflow-y-hidden w-full" : ""}>
            <Header />
            {children}
            <Separator desktop={true} />
            <Footer />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserLayout;
