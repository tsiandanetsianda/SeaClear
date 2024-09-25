/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Logo2ColorDark } from "../../icons/Logo2ColorDark";
import "./style.css";

export const Testimonial = ({
  breakpoint,
  className,
  stars = "/img/stars.svg",
  text = "&#34;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.&#34;",
  avatarImage = "/img/avatar-image.png",
  text1 = "Name Surname",
  text2 = "Position, Company name",
  hasDivider = true,
  visible = true,
}) => {
  return (
    <div className={`testimonial breakpoint-23-${breakpoint} ${className}`}>
      <div className="content-7">
        <img className="stars" alt="Stars" src={breakpoint === "mobile" ? "/img/stars-1.svg" : stars} />
        <p className="quote">{text}</p>
        <div className="avatar">
          <img
            className="avatar-image"
            alt="Avatar image"
            src={breakpoint === "mobile" ? "/img/avatar-image-1.png" : avatarImage}
          />
          <div className="avatar-content">
            <div className="text-5">{text1}</div>
            <div className="text-6">{text2}</div>
          </div>
          {hasDivider && (
            <>
              <>{breakpoint === "desktop" && <img className="divider" alt="Divider" src="/img/divider.svg" />}</>
            </>
          )}

          {visible && <Logo2ColorDark className="logo-color-dark" />}
        </div>
      </div>
    </div>
  );
};

Testimonial.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  stars: PropTypes.string,
  text: PropTypes.string,
  avatarImage: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  hasDivider: PropTypes.bool,
  visible: PropTypes.bool,
};
