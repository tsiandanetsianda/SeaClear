/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const TextArea = ({
  className,
  text = "Type your message...",
  lineClassName,
  line = "/img/line-1-2.svg",
  lineClassNameOverride,
}) => {
  return (
    <div className={`text-area ${className}`}>
      <div className="type-your-message-2">{text}</div>
      <img className={`line ${lineClassName}`} alt="Line" src={line} />
      <img className={`line-2 ${lineClassNameOverride}`} alt="Line" src="/img/line-2-2.svg" />
    </div>
  );
};

TextArea.propTypes = {
  text: PropTypes.string,
  line: PropTypes.string,
};
