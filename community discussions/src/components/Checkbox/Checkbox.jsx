/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Checkbox = ({ selected, className, labelClassName, text = "Checkbox" }) => {
  return (
    <div className={`checkbox ${className}`}>
      {!selected && <div className="div-2" />}

      {selected && <img className="img-2" alt="Checkbox" src="/img/checkbox.svg" />}

      <div className={`label ${labelClassName}`}>{text}</div>
    </div>
  );
};

Checkbox.propTypes = {
  selected: PropTypes.bool,
  text: PropTypes.string,
};
