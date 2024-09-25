/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume52 } from "../../icons/IconRelume52";
import "./style.css";

export const Layout24 = ({
  breakpoint,
  className,
  text = "Long heading is what you see here in this feature section",
  text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
}) => {
  return (
    <div className={`layout-24 breakpoint-52-${breakpoint} ${className}`}>
      <div className="container-6">
        <div className="content-11">
          <IconRelume52 className="icon-relume-61" color="black" />
          <div className="content-12">
            <p className="heading-8">{text}</p>
            <p className="text-8">{text1}</p>
          </div>
        </div>
        <img
          className="placeholder-image-4"
          alt="Placeholder image"
          src={breakpoint === "mobile" ? "/img/placeholder-image-9.png" : "/img/placeholder-image-8.png"}
        />
      </div>
    </div>
  );
};

Layout24.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
};
