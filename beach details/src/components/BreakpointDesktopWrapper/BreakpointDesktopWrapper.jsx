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
  containerClassName,
  headingClassName,
  text = "Long heading is what you see here in this feature section",
  textClassName,
  text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  hasNumber = true,
  textClassNameOverride,
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  listItemClassName,
  hasDiv = true,
  hasPlaceholderImage = true,
}) => {
  return (
    <div className={`breakpoint-desktop-wrapper breakpoint-13-${breakpoint} ${className}`}>
      <div className={`container-4 ${containerClassName}`}>
        <div className="content-5">
          <div className="content-6">
            <p className={`heading-2 ${headingClassName}`}>{text}</p>
            <p className={`text-2 ${textClassName}`}>{text1}</p>
          </div>
          <div className="list-2">
            <div className="list-item-3">
              {hasNumber && <div className="number-3">50%</div>}

              <p className={`text-3 ${textClassNameOverride}`}>{text2}</p>
            </div>
            <div className={`list-item-4 ${listItemClassName}`}>
              {hasDiv && <div className="number-4">50%</div>}

              <p className="text-3">{text2}</p>
            </div>
          </div>
        </div>
        {hasPlaceholderImage && (
          <img
            className="img"
            alt="Placeholder image"
            src={breakpoint === "mobile" ? "/img/placeholder-image-7.png" : "/img/placeholder-image-8.png"}
          />
        )}
      </div>
    </div>
  );
};

BreakpointDesktopWrapper.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  hasNumber: PropTypes.bool,
  text2: PropTypes.string,
  hasDiv: PropTypes.bool,
  hasPlaceholderImage: PropTypes.bool,
};
