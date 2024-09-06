/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Logos1 } from "../../icons/Logos1";
import "./style.css";

export const Testimonial = ({
  breakpoint,
  className,
  stars = "/img/stars.svg",
  text = "&#34;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.&#34;",
  text1 = "Name Surname",
  text2 = "Position, Company name",
  dividerClassName,
  divider = "/img/divider.svg",
  visible = true,
}) => {
  return (
    <div className={`testimonial breakpoint-52-${breakpoint} ${className}`}>
      <div className="content-7">
        {breakpoint === "desktop" && (
          <>
            <img className="placeholder-image" alt="Placeholder image" src="/img/placeholder-image.png" />
            <div className="content-8">
              <img className="img-3" alt="Stars" src={stars} />
              <p className="quote">{text}</p>
              <div className="avatar">
                <div className="avatar-content">
                  <div className="text-11">{text1}</div>
                  <div className="text-12">{text2}</div>
                </div>
                <img className={`divider ${dividerClassName}`} alt="Divider" src={divider} />
                {visible && <Logos1 className="logos" />}
              </div>
            </div>
          </>
        )}

        {breakpoint === "mobile" && (
          <>
            <div className="slider-dots">
              <div className="dot" />
              <div className="dot-2" />
              <div className="dot-2" />
              <div className="dot-2" />
              <div className="dot-2" />
            </div>
            <img className="img-3" alt="Slider buttons" src="/img/slider-buttons-1.svg" />
          </>
        )}
      </div>
      <div className="content-9">
        <div className="slider-dots-2">
          {breakpoint === "desktop" && (
            <>
              <div className="dot" />
              <div className="dot-2" />
              <div className="dot-2" />
              <div className="dot-2" />
              <div className="dot-2" />
            </>
          )}

          {breakpoint === "mobile" && (
            <>
              <img className="img-3" alt="Stars" src="/img/stars-1.svg" />
              <p className="quote-2">{text}</p>
              <div className="avatar-2">
                <div className="avatar-content">
                  <div className="text-11">{text1}</div>
                  <div className="text-12">{text2}</div>
                </div>
                <img className="divider" alt="Divider" src="/img/divider-1.svg" />
                <Logos1 className="logos-1" />
              </div>
            </>
          )}
        </div>
        <img
          className="slider-buttons"
          alt="Slider buttons"
          src={breakpoint === "mobile" ? "/img/placeholder-image-1.png" : "/img/slider-buttons-1.svg"}
        />
      </div>
    </div>
  );
};

Testimonial.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  stars: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  divider: PropTypes.string,
  visible: PropTypes.bool,
};
