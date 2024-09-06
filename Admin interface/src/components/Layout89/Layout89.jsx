/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume52 } from "../../icons/IconRelume52";
import { Button } from "../Button";
import "./style.css";

export const Layout89 = ({
  breakpoint,
  className,
  text = "Tagline",
  text1 = "Medium length section heading goes here",
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
  buttonStylePrimarySmallClassName,
  buttonText = "Button",
  visible = true,
}) => {
  return (
    <div className={`layout-89 breakpoint-40-${breakpoint} ${className}`}>
      <div className="content-9">
        <div className="column-9">
          <div className="subheading-4">{text}</div>
          <p className="heading-6">{text1}</p>
        </div>
        <div className="column-10">
          <p className="text-suspendisse">{text2}</p>
          <div className="actions-6">
            <Button
              className={buttonStylePrimarySmallClassName}
              darkMode={false}
              iconPosition="no-icon"
              small={false}
              style="secondary"
              text={buttonText}
            />
            {visible && (
              <Button
                className="button-10"
                darkMode={false}
                icon={<IconRelume52 className="icon-relume-60" color="black" />}
                iconPosition="trailing"
                small={false}
                style="link"
                text="Button"
              />
            )}
          </div>
        </div>
      </div>
      <img
        className="placeholder-image-2"
        alt="Placeholder image"
        src={breakpoint === "mobile" ? "/img/placeholder-image-5.png" : "/img/placeholder-image-4.png"}
      />
    </div>
  );
};

Layout89.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  buttonText: PropTypes.string,
  visible: PropTypes.bool,
};
