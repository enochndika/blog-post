import { DefaultTopNavigation } from "./topNavigation";
import { Footer } from "./footer";
import { HorizontalLine } from "../../horizontalLign";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <DefaultTopNavigation />
      {children}
      <HorizontalLine desktop />
      <Footer />
    </>
  );
};

export default DefaultLayout;
