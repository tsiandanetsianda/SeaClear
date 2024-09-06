/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume52 } from "../../icons/IconRelume52";
import { IconRelume57 } from "../../icons/IconRelume57";
import { Button } from "../Button";
import "./style.css";

export const BreakpointDesktopWrapper = ({
  breakpoint,
  className,
  text = "Tagline",
  text1 = "Medium length section heading goes here",
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttonText = "Button",
  buttonText1 = "Button",
}) => {
  return (
    <div className={`breakpoint-desktop-wrapper breakpoint-8-${breakpoint} ${className}`}>
      <div className="container-4">
        {breakpoint === "desktop" && (
          <>
            <img className="img" alt="Placeholder image" src="/img/placeholder-image-4.png" />
            <div className="content-4">
              <div className="section-title">
                <div className="subheading">{text}</div>
                <div className="content-5">
                  <p className="p">{text1}</p>
                  <p className="text-2">{text2}</p>
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
                  icon={<IconRelume57 className="icon-relume-2" />}
                  iconPosition="trailing"
                  small={false}
                  style="link"
                  text={buttonText1}
                />
              </div>
            </div>
          </>
        )}

        {breakpoint === "mobile" && (
          <>
            <div className="content-6">
              <div className="section-title-2">
                <div className="subheading">{text}</div>
                <div className="content-7">
                  <p className="heading-2">{text1}</p>
                  <p className="text-3">{text2}</p>
                </div>
              </div>
              <div className="actions-3">
                <Button
                  className="button-4"
                  darkMode={false}
                  iconPosition="no-icon"
                  small={false}
                  style="secondary"
                  text="Button"
                />
                <Button
                  className="button-5"
                  darkMode={false}
                  icon={<IconRelume52 className="icon-relume-2" color="black" />}
                  iconPosition="trailing"
                  small={false}
                  style="link"
                  text="Button"
                />
              </div>
            </div>
            <img className="placeholder-image-2" alt="Placeholder image" src="/img/placeholder-image-5.png" />
          </>
        )}
      </div>
    </div>
  );
};

BreakpointDesktopWrapper.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  buttonText: PropTypes.string,
  buttonText1: PropTypes.string,
};
