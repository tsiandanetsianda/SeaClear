/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume48 } from "../../icons/IconRelume48";
import "./style.css";

export const Button = ({
  style,
  small,
  darkMode,
  iconPosition,
  className,
  text = "Button",
  divClassName,
  icon = <IconRelume48 className="icon-relume" color="black" />,
}) => {
  return (
    <div className={`button ${iconPosition} ${style} small-${small} dark-mode-${darkMode} ${className}`}>
      {iconPosition === "no-icon" && <div className={`text-wrapper ${divClassName}`}>{text}</div>}

      {["leading", "only"].includes(iconPosition) && (
        <IconRelume48
          className="icon-relume"
          color={
            (!darkMode && style === "link") ||
            (!darkMode && style === "secondary") ||
            (!darkMode && style === "tertiary") ||
            (darkMode && style === "primary")
              ? "black"
              : "white"
          }
        />
      )}

      {["leading", "trailing"].includes(iconPosition) && <div className="div">{text}</div>}

      {iconPosition === "trailing" && <>{icon}</>}
    </div>
  );
};

Button.propTypes = {
  style: PropTypes.oneOf(["primary", "link", "secondary", "tertiary"]),
  small: PropTypes.bool,
  darkMode: PropTypes.bool,
  iconPosition: PropTypes.oneOf(["no-icon", "trailing", "only", "leading"]),
  text: PropTypes.string,
};
