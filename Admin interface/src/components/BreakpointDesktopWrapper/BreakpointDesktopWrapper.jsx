/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume49 } from "../../icons/IconRelume49";
import { IconRelume52 } from "../../icons/IconRelume52";
import { Button } from "../Button";
import "./style.css";

export const BreakpointDesktopWrapper = ({
  breakpoint,
  className,
  text = "Tagline",
  text1 = "Medium length section heading goes here",
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  text3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  buttonText = "Button",
  buttonText1 = "Button",
}) => {
  return (
    <div className={`breakpoint-desktop-wrapper breakpoint-12-${breakpoint} ${className}`}>
      <div className="container-3">
        <div className="content-3">
          <div className="content-4">
            <div className="section-title-2">
              <div className="subheading-2">{text}</div>
              <div className="content-5">
                <p className="heading-4">{text1}</p>
                <p className="text-3">{text2}</p>
              </div>
            </div>
            <div className="list">
              <div className="list-item">
                <div className="number">50%</div>
                <p className="text-4">{text3}</p>
              </div>
              <div className="list-item-2">
                <div className="number-2">50%</div>
                <p className="text-4">{text3}</p>
              </div>
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
              icon={
                breakpoint === "mobile" ? (
                  <IconRelume52 className="icon-relume-2" color="black" />
                ) : (
                  <IconRelume49 className="icon-relume-2" />
                )
              }
              iconPosition="trailing"
              small={false}
              style="link"
              text={buttonText1}
            />
          </div>
        </div>
        <img
          className="placeholder-image"
          alt="Placeholder image"
          src={breakpoint === "mobile" ? "/img/placeholder-image-9.png" : "/img/placeholder-image-8.png"}
        />
      </div>
    </div>
  );
};

BreakpointDesktopWrapper.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  buttonText: PropTypes.string,
  buttonText1: PropTypes.string,
};
