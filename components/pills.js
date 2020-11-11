import React, { useState } from "react";
import {
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBContainer,
} from "mdbreact";
import style from "../styles/components/pills.module.css";

export const Pills = ({ children, preview, previewTitle, addPost }) => {
  const [items, setItems] = useState({
    default: "1",
  });

  const togglePills = (type, tab) => (e) => {
    e.preventDefault();
    if (items.default[type] !== tab) {
      let item = { ...items };
      item[type] = tab;
      setItems(item);
    }
  };

  return (
    <MDBContainer className={style.container} fluid>
      <MDBNav className="mt-5">
        <MDBNavItem
          tag="div"
          className={items["default"] === "1" ? style.active : style.item}
          active={items["default"] === "1"}
          onClick={togglePills("default", "1")}
        >
          {addPost}
        </MDBNavItem>
        <MDBNavItem
          tag="div"
          className={items["default"] === "2" ? style.active : style.item}
          active={items["default"] === "2"}
          onClick={togglePills("default", "2")}
        >
          {previewTitle}
        </MDBNavItem>
      </MDBNav>
      <MDBTabContent activeItem={items["default"]}>
        <MDBTabPane tabId="1">{children}</MDBTabPane>
        <MDBTabPane tabId="2">{preview}</MDBTabPane>
      </MDBTabContent>
    </MDBContainer>
  );
};
