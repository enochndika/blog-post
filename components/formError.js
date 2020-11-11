import React from "react";

const styles = {
  fontSize: 13,
  marginTop: -15,
};
export const FormError = ({ message }) => (
  <div className="text-danger" style={styles}>
    {message}
  </div>
);
