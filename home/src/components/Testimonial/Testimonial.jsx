/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Logos } from "../../icons/Logos";
import "./style.css";

export const Testimonial = ({
  breakpoint,
  className,
  visible = true,
  quoteClassName,
  text = "&#34;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.&#34;",
  text1 = "Name Surname",
  text2 = "Position, Company name",
}) => {
  return (
    <div className={`testimonial breakpoint-25-${breakpoint} ${className}`}>
      <div className="content-7">
        {visible && <Logos className="logos-1" />}

        <p className={`quote ${quoteClassName}`}>{text}</p>
        <div className="avatar">
          <img
            className="avatar-image"
            alt="Avatar image"
            src={breakpoint === "mobile" ? "/img/avatar-image-1.png" : "/img/avatar-image.png"}
          />
          <div className="avatar-content">
            <div className="text-3">{text1}</div>
            <div className="text-4">{text2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Testimonial.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  visible: PropTypes.bool,
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
};
