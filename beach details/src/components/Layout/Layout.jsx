/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume49 } from "../../icons/IconRelume49";
import { Button } from "../Button";
import "./style.css";

export const Layout = ({
  breakpoint,
  className,
  containerClassName,
  subheadingClassName,
  text = "Tagline",
  headingClassName,
  text1 = "Medium length section heading goes here",
  textClassName,
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  numberClassName,
  textClassNameOverride,
  text3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  numberClassNameOverride,
  divClassName,
  buttonText = "Button",
  buttonDivClassName,
  buttonText1 = "Button",
  buttonIcon = <IconRelume49 className="icon-relume-49" />,
  buttonDivClassNameOverride,
  placeholderImageClassName,
  placeholderImage = "/img/placeholder-image-8.png",
}) => {
  return (
    <div className={`layout breakpoint-${breakpoint} ${className}`}>
      <div className={`container-3 ${containerClassName}`}>
        <div className="content-2">
          <div className="content-3">
            <div className="section-title">
              <div className={`subheading ${subheadingClassName}`}>{text}</div>
              <div className="content-4">
                <p className={`heading ${headingClassName}`}>{text1}</p>
                <p className={`text ${textClassName}`}>{text2}</p>
              </div>
            </div>
            <div className="list">
              <div className="list-item">
                <div className={`number ${numberClassName}`}>50%</div>
                <p className={`p ${textClassNameOverride}`}>{text3}</p>
              </div>
              <div className="list-item-2">
                <div className={`number-2 ${numberClassNameOverride}`}>50%</div>
                <p className={`p ${divClassName}`}>{text3}</p>
              </div>
            </div>
          </div>
          <div className="actions-3">
            <Button
              className="button-4"
              darkMode={false}
              divClassName={buttonDivClassName}
              iconPosition="no-icon"
              small={false}
              style="secondary"
              text={buttonText}
            />
            <Button
              className="button-5"
              darkMode={false}
              divClassNameOverride={buttonDivClassNameOverride}
              icon={buttonIcon}
              iconPosition="trailing"
              small={false}
              style="link"
              text={buttonText1}
            />
          </div>
        </div>
        <img
          className={`placeholder-image ${placeholderImageClassName}`}
          alt="Placeholder image"
          src={breakpoint === "mobile" ? "/img/placeholder-image-9.png" : placeholderImage}
        />
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
  placeholderImage: PropTypes.string,
};
