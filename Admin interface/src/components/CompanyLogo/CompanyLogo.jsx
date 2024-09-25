/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const CompanyLogo = ({ color, className, colorDark = "/img/color-dark.png" }) => {
  return (
    <img
      className={`company-logo ${color} ${className}`}
      alt="Color dark"
      src={color === "light" ? "/img/color-light.png" : colorDark}
    />
  );
};

CompanyLogo.propTypes = {
  color: PropTypes.oneOf(["dark", "light"]),
  colorDark: PropTypes.string,
};
