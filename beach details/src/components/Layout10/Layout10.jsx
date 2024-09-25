/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconRelume49 } from "../../icons/IconRelume49";
import { IconRelume50 } from "../../icons/IconRelume50";
import { Button } from "../Button";
import "./style.css";

export const Layout10 = ({
  breakpoint,
  className,
  text = "Tagline",
  text1 = "Medium length section heading goes here",
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  text3 = "Subheading one",
  text4 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  text5 = "Subheading two",
  buttonText = "Button",
  buttonText1 = "Button",
  buttonIcon = <IconRelume49 className="icon-relume-49-instance" />,
}) => {
  return (
    <div className={`layout-10 breakpoint-25-${breakpoint} ${className}`}>
      <div className="container-5">
        <div className="content-7">
          <div className="content-8">
            <div className="section-title-2">
              <div className="subheading-2">{text}</div>
              <div className="content-9">
                <p className="heading-3">{text1}</p>
                <p className="text-4">{text2}</p>
              </div>
            </div>
            <div className="list-3">
              <div className="list-item-5">
                <IconRelume50 className="icon-relume-50" color="black" />
                <div className="subheading-one">{text3}</div>
                <p className="text-5">{text4}</p>
              </div>
              <div className="list-item-6">
                <IconRelume50 className="icon-relume-50" color="black" />
                <div className="subheading-two">{text5}</div>
                <p className="text-5">{text4}</p>
              </div>
            </div>
          </div>
          <div className="actions-4">
            <Button
              className="button-6"
              darkMode={false}
              iconPosition="no-icon"
              small={false}
              style="secondary"
              text={buttonText}
            />
            <Button
              className="button-7"
              darkMode={false}
              icon={buttonIcon}
              iconPosition="trailing"
              small={false}
              style="link"
              text={buttonText1}
            />
          </div>
        </div>
        <img
          className="placeholder-image-2"
          alt="Placeholder image"
          src={breakpoint === "mobile" ? "/img/placeholder-image-9.png" : "/img/placeholder-image-8.png"}
        />
      </div>
    </div>
  );
};

Layout10.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  text5: PropTypes.string,
  buttonText: PropTypes.string,
  buttonText1: PropTypes.string,
};
