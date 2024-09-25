/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const BreakpointDesktopWrapper = ({
  breakpoint,
  className,
  text = "Long heading is what you see here in this feature section",
  text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  placeholderImage = "/img/placeholder-image-2.png",
}) => {
  return (
    <div className={`breakpoint-desktop-wrapper breakpoint-44-${breakpoint} ${className}`}>
      <div className="container-4">
        <div className="content-11">
          <p className="heading-5">{text}</p>
          <p className="text-9">{text1}</p>
        </div>
        <img
          className="placeholder-image-3"
          alt="Placeholder image"
          src={breakpoint === "mobile" ? "/img/placeholder-image-3.png" : placeholderImage}
        />
      </div>
    </div>
  );
};

BreakpointDesktopWrapper.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  placeholderImage: PropTypes.string,
};
