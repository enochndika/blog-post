import { useState } from "react";
import { MDBCollapse, MDBIcon } from "mdbreact";

export const Collapse = ({ children, title, icon }) => {
  const [collapseID, setCollapseId] = useState("");

  const toggleCollapse = (collapseID) => () => {
    setCollapseId(
      (prevState) => (collapseID = prevState !== collapseID ? collapseID : "")
    );
  };

  const styles = {
    icon: {
      paddingTop: 0,
    },
  };

  return (
    <>
      <div
        onClick={toggleCollapse("basicCollapse")}
        className="my-2 font-weight-bold"
      >
        {title}
        {icon && collapseID && <MDBIcon icon="angle-up" style={styles.icon} />}
        {icon && !collapseID && (
          <MDBIcon icon="angle-down" style={styles.icon} />
        )}
      </div>
      <MDBCollapse id="basicCollapse" isOpen={collapseID}>
        {children}
      </MDBCollapse>
    </>
  );
};
