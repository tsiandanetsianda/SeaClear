/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume52 } from "../../icons/IconRelume52";
import { Button } from "../Button";
import "./style.css";

export const Layout238 = ({
  breakpoint,
  className,
  text = "Long heading is what you see here in this feature section",
  text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
  buttonText = "Button",
  buttonIcon = <IconRelume52 className="icon-relume-58" color="black" />,
  buttonText1 = "Button",
  override = <IconRelume52 className="icon-relume-58" color="black" />,
  buttonText2 = "Button",
  buttonIcon1 = <IconRelume52 className="icon-relume-58" color="black" />,
}) => {
  return (
    <div className={`layout-238 breakpoint-18-${breakpoint} ${className}`}>
      <p className="heading-4">{text}</p>
      <div className="row-2">
        <div className="column-5">
          <div className="content-10">
            <IconRelume52 className="icon-relume-52" color="black" />
            <div className="section-title-4">
              <p className="heading-5">{text}</p>
              <p className="text-5">{text1}</p>
            </div>
          </div>
          <div className="action">
            <Button
              className="button-8"
              darkMode={false}
              icon={buttonIcon}
              iconPosition="trailing"
              small={false}
              style="link"
              text={buttonText}
            />
          </div>
        </div>
        <div className="column-6">
          <div className="content-11">
            <IconRelume52 className="icon-relume-52" color="black" />
            <div className="section-title-5">
              <p className="heading-6">{text}</p>
              <p className="text-5">{text1}</p>
            </div>
          </div>
          <div className="action">
            <Button
              className="button-8"
              darkMode={false}
              icon={override}
              iconPosition="trailing"
              small={false}
              style="link"
              text={buttonText1}
            />
          </div>
        </div>
        <div className="column-7">
          <div className="content-12">
            <IconRelume52 className="icon-relume-52" color="black" />
            <div className="section-title-6">
              <p className="heading-7">{text}</p>
              <p className="text-5">{text1}</p>
            </div>
          </div>
          <div className="action">
            <Button
              className="button-8"
              darkMode={false}
              icon={buttonIcon1}
              iconPosition="trailing"
              small={false}
              style="link"
              text={buttonText2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Layout238.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  buttonText: PropTypes.string,
  buttonText1: PropTypes.string,
  buttonText2: PropTypes.string,
};
