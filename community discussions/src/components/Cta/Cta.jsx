/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Button } from "../Button";
import "./style.css";

export const Cta = ({
  breakpoint,
  className,
  text = "Medium length heading goes here",
  text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttonDivClassName,
  buttonStylePrimarySmallClassName,
  buttonText = "Button",
  buttonText1 = "Button",
}) => {
  return (
    <div className={`CTA breakpoint-46-${breakpoint} ${className}`}>
      <div className="container-4">
        <div className="heading-wrapper">
          <p className="heading-4">{text}</p>
        </div>
        <div className="column-8">
          <p className="text-10">{text1}</p>
          <div className="actions-5">
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
              className="button-8"
              darkMode={false}
              iconPosition="no-icon"
              small={false}
              style="secondary"
              text={buttonText1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Cta.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  buttonText: PropTypes.string,
  buttonText1: PropTypes.string,
};
