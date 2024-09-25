/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Header = ({
  breakpoint,
  className,
  text = "Short heading here",
  text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
}) => {
  return (
    <div className={`header breakpoint-${breakpoint} ${className}`}>
      <div className="content-2">
        <div className="short-heading-here">{text}</div>
        <p className="lorem-ipsum-dolor">{text1}</p>
      </div>
    </div>
  );
};

Header.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
};
