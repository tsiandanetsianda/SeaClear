/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume48 } from "../../icons/IconRelume48";
import { Button } from "../Button";
import "./style.css";

export const Portfolio = ({
  breakpoint,
  className,
  text = "Portfolio",
  text1 = "Short heading goes here",
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  placeholderImage = "/img/placeholder-image-5.png",
  text3 = "Project name here",
  textClassName,
  text4 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  buttonText = "View project",
  img = "/img/placeholder-image-5.png",
  textClassNameOverride,
  buttonText1 = "View project",
}) => {
  return (
    <div className={`portfolio breakpoint-3-${breakpoint} ${className}`}>
      <div className="section-title">
        <div className="subheading">{text}</div>
        <div className="content-3">
          <div className="heading">{text1}</div>
          <p className="text">{text2}</p>
        </div>
      </div>
      <div className="content-4">
        <div className="portfolio-list">
          <div className="card">
            <img
              className="placeholder-image"
              alt="Placeholder image"
              src={breakpoint === "mobile" ? "/img/placeholder-image-7.png" : placeholderImage}
            />
            <div className="content-5">
              <div className="text-2">
                <div className="heading-2">{text3}</div>
                <p className={`p ${textClassName}`}>{text4}</p>
              </div>
              <Button
                className="button-4"
                darkMode={false}
                icon={<IconRelume48 className="icon-relume-48" color="black" />}
                iconPosition="trailing"
                small={false}
                style="link"
                text={buttonText}
              />
            </div>
          </div>
          <div className="card-2">
            <img
              className="img"
              alt="Placeholder image"
              src={breakpoint === "mobile" ? "/img/placeholder-image-7.png" : img}
            />
            <div className="content-6">
              <div className="text-3">
                <div className="heading-3">{text3}</div>
                <p className={`text-4 ${textClassNameOverride}`}>{text4}</p>
              </div>
              <Button
                className="button-4"
                darkMode={false}
                icon={<IconRelume48 className="icon-relume-48" color="black" />}
                iconPosition="trailing"
                small={false}
                style="link"
                text={buttonText1}
              />
            </div>
          </div>
        </div>
        <Button
          className="button-5"
          darkMode={false}
          iconPosition="no-icon"
          small={false}
          style="secondary"
          text="View all"
        />
      </div>
    </div>
  );
};

Portfolio.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  placeholderImage: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  buttonText: PropTypes.string,
  img: PropTypes.string,
  buttonText1: PropTypes.string,
};
