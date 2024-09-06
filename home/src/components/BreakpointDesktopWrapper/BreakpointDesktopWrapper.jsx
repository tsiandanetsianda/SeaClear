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
  placeholderImageClassName,
  placeholderImage = "/img/placeholder-image.png",
}) => {
  return (
    <div className={`breakpoint-desktop-wrapper breakpoint-28-${breakpoint} ${className}`}>
      <div className="container-3">
        <div className="content-8">
          <p className="heading-4">{text}</p>
          <p className="text-5">{text1}</p>
        </div>
        <img
          className={`placeholder-image-2 ${placeholderImageClassName}`}
          alt="Placeholder image"
          src={breakpoint === "mobile" ? "/img/placeholder-image-1.png" : placeholderImage}
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
