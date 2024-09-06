/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Button } from "../Button";
import "./style.css";

export const Header = ({
  breakpoint,
  className,
  text = "Tagline",
  text1 = "Short heading here",
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  buttonDivClassName,
  buttonStylePrimarySmallClassName,
  buttonText = "Button",
  buttonText1 = "Button",
}) => {
  return (
    <div className={`header breakpoint-${breakpoint} ${className}`}>
      <div className="container-3">
        <div className="section-title">
          <div className="tagline">{text}</div>
          <div className="content-2">
            <div className="short-heading-here">{text1}</div>
            <p className="lorem-ipsum-dolor">{text2}</p>
          </div>
        </div>
        <div className="actions-3">
          <Button
            className={buttonStylePrimarySmallClassName}
            darkMode={false}
            divClassName={buttonDivClassName}
            iconPosition="no-icon"
            small={false}
            style="primary"
            text={buttonText}
          />
          <Button
            className="button-4"
            darkMode={false}
            iconPosition="no-icon"
            small={false}
            style="secondary"
            text={buttonText1}
          />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  buttonText: PropTypes.string,
  buttonText1: PropTypes.string,
};
