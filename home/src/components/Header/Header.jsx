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
  text = "Medium length hero heading goes here",
  text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttonText = "Button",
  buttonDivClassName,
  buttonStylePrimarySmallClassName,
  buttonText1 = "Button",
  placeholderImage = "/img/placeholder-image-4.png",
}) => {
  return (
    <div className={`header breakpoint-${breakpoint} ${className}`}>
      <div className="column-5">
        <div className="content-2">
          <p className="medium-length-hero">{text}</p>
          <p className="lorem-ipsum-dolor">{text1}</p>
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
      <img
        className="placeholder-image"
        alt="Placeholder image"
        src={breakpoint === "mobile" ? "/img/placeholder-image-5.png" : placeholderImage}
      />
    </div>
  );
};

Header.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  buttonText: PropTypes.string,
  buttonText1: PropTypes.string,
  placeholderImage: PropTypes.string,
};
