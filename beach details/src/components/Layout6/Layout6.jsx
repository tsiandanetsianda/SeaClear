/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Layout6 = ({
  breakpoint,
  className,
  containerClassName,
  contentClassName,
  text = "Long heading is what you see here in this feature section",
  text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  text2 = "Subheading one",
  text3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  text4 = "Subheading two",
  placeholderImage = "/img/placeholder-image-8.png",
}) => {
  return (
    <div className={`layout-6 breakpoint-39-${breakpoint} ${className}`}>
      <div className={`container-6 ${containerClassName}`}>
        <div className={`content-10 ${contentClassName}`}>
          <div className="content-11">
            <p className="heading-4">{text}</p>
            <p className="text-6">{text1}</p>
          </div>
          <div className="list-4">
            <div className="list-item-7">
              <div className="subheading-one-2">{text2}</div>
              <p className="text-7">{text3}</p>
            </div>
            <div className="list-item-8">
              <div className="subheading-two-2">{text4}</div>
              <p className="text-7">{text3}</p>
            </div>
          </div>
        </div>
        <img
          className="placeholder-image-3"
          alt="Placeholder image"
          src={breakpoint === "mobile" ? "/img/placeholder-image-9.png" : placeholderImage}
        />
      </div>
    </div>
  );
};

Layout6.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  placeholderImage: PropTypes.string,
};
