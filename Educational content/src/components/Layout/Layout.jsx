/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Layout = ({
  breakpoint,
  className,
  text = "Long heading is what you see here in this feature section",
  text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
}) => {
  return (
    <div className={`layout breakpoint-3-${breakpoint} ${className}`}>
      <div className="container-3">
        <div className="content-3">
          <p className="heading">{text}</p>
          <p className="text">{text1}</p>
        </div>
        <img
          className="placeholder-image"
          alt="Placeholder image"
          src={breakpoint === "mobile" ? "/img/placeholder-image-5.png" : "/img/placeholder-image-4.png"}
        />
      </div>
    </div>
  );
};

Layout.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
};
