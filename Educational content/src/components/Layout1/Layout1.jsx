/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume57 } from "../../icons/IconRelume57";
import { Button } from "../Button";
import "./style.css";

export const Layout1 = ({
  breakpoint,
  className,
  text = "Tagline",
  text1 = "Medium length section heading goes here",
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttonText = "Button",
  buttonText1 = "Button",
  buttonIcon = <IconRelume57 className="icon-relume-57" />,
}) => {
  return (
    <div className={`layout-1 breakpoint-10-${breakpoint} ${className}`}>
      <div className="container-5">
        <div className="content-8">
          <div className="section-title-3">
            <div className="subheading-2">{text}</div>
            <div className="content-9">
              <p className="heading-3">{text1}</p>
              <p className="text-4">{text2}</p>
            </div>
          </div>
          <div className="actions-4">
            <Button
              className="button-6"
              darkMode={false}
              iconPosition="no-icon"
              small={false}
              style="secondary"
              text={buttonText}
            />
            <Button
              className="button-7"
              darkMode={false}
              icon={buttonIcon}
              iconPosition="trailing"
              small={false}
              style="link"
              text={buttonText1}
            />
          </div>
        </div>
        <img
          className="placeholder-image-3"
          alt="Placeholder image"
          src={breakpoint === "mobile" ? "/img/placeholder-image-5.png" : "/img/placeholder-image-4.png"}
        />
      </div>
    </div>
  );
};

Layout1.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  buttonText: PropTypes.string,
  buttonText1: PropTypes.string,
};
