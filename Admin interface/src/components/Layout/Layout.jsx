/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume52 } from "../../icons/IconRelume52";
import { Button } from "../Button";
import "./style.css";

export const Layout = ({
  breakpoint,
  className,
  text = "Tagline",
  text1 = "Medium length section heading goes here",
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
  text3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
  buttonText = "Button",
  buttonText1 = "Button",
}) => {
  return (
    <div className={`layout breakpoint-${breakpoint} ${className}`}>
      <div className="section-title">
        <div className="column-5">
          <div className="subheading">{text}</div>
          <p className="heading">{text1}</p>
        </div>
        <p className="text">{text2}</p>
      </div>
      <div className="content-2">
        <div className="row-2">
          <div className="column-6">
            <IconRelume52 className="icon-relume-52" color="black" />
            <p className="p">{text1}</p>
            <p className="text-2">{text3}</p>
          </div>
          <div className="column-7">
            <IconRelume52 className="icon-relume-52" color="black" />
            <p className="heading-2">{text1}</p>
            <p className="text-2">{text3}</p>
          </div>
          <div className="column-8">
            <IconRelume52 className="icon-relume-52" color="black" />
            <p className="heading-3">{text1}</p>
            <p className="text-2">{text3}</p>
          </div>
        </div>
        <div className="actions-3">
          <Button
            className="button-4"
            darkMode={false}
            iconPosition="no-icon"
            small={false}
            style="secondary"
            text={buttonText}
          />
          <Button
            className="button-5"
            darkMode={false}
            icon={<IconRelume52 className="icon-relume-58" color="black" />}
            iconPosition="trailing"
            small={false}
            style="link"
            text={buttonText1}
          />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  buttonText: PropTypes.string,
  buttonText1: PropTypes.string,
};
