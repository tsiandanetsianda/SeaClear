/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume52 } from "../../icons/IconRelume52";
import { Button } from "../Button";
import "./style.css";

export const Layout = ({
  breakpoint,
  className,
  text = "Tagline",
  text1 = "Short heading goes here",
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  text3 = "Medium length section heading goes here",
  buttonText = "Button",
  buttonText1 = "Button",
  buttonText2 = "Button",
}) => {
  return (
    <div className={`layout breakpoint-5-${breakpoint} ${className}`}>
      <div className="section-title">
        <div className="subheading">{text}</div>
        <div className="content-3">
          <div className="heading">{text1}</div>
          <p className="text">{text2}</p>
        </div>
      </div>
      <div className="row-wrapper">
        <div className="row-2">
          <div className="card">
            <div className="content-4">
              <div className="content-top">
                <IconRelume52 className="icon-relume-52" color="black" />
                <div className="div-2">
                  <p className="p">{text3}</p>
                  <p className="text-2">{text2}</p>
                </div>
              </div>
              <div className="button-wrapper">
                <Button
                  className="button-5"
                  darkMode={false}
                  iconPosition="trailing"
                  small={false}
                  style="link"
                  text={buttonText}
                />
              </div>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="content-5">
              <div className="content-top-2">
                <IconRelume52 className="icon-relume-52" color="black" />
                <div className="div-2">
                  <p className="heading-2">{text3}</p>
                  <p className="text-2">{text2}</p>
                </div>
              </div>
              <div className="button-wrapper">
                <Button
                  className="button-5"
                  darkMode={false}
                  iconPosition="trailing"
                  small={false}
                  style="link"
                  text={buttonText1}
                />
              </div>
            </div>
          </div>
          <div className="card-2">
            <div className="image">
              <img
                className="img"
                alt="Placeholder image"
                src={breakpoint === "mobile" ? "/img/placeholder-image-3.png" : "/img/placeholder-image-2.png"}
              />
            </div>
            <div className="content-6">
              <div className="div-2">
                <div className="subheading-2">{text}</div>
                <div className="div-2">
                  <p className="heading-3">{text3}</p>
                  <p className="text-2">{text2}</p>
                </div>
              </div>
              <div className="button-wrapper">
                <Button
                  className="button-5"
                  darkMode={false}
                  iconPosition="trailing"
                  small={false}
                  style="link"
                  text={buttonText2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  buttonText: PropTypes.string,
  buttonText1: PropTypes.string,
  buttonText2: PropTypes.string,
};
