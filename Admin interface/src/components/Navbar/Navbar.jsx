/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconX } from "../../icons/IconX";
import { Button } from "../Button";
import { CompanyLogo } from "../CompanyLogo";
import "./style.css";

export const Navbar = ({
  breakpoint,
  text = "Link One",
  text1 = "Link Two",
  text2 = "Link Three",
  text3 = "Link Four",
  buttonText = "Button",
  buttonStylePrimarySmallClassName,
  buttonText1 = "Button",
  buttonDivClassName,
}) => {
  return (
    <div className={`navbar ${breakpoint}`}>
      {breakpoint === "desktop" && (
        <div className="container">
          <div className="content">
            <CompanyLogo className="company-logo-instance" color="dark" colorDark="/img/company-logo-2.png" />
          </div>
          <div className="column">
            <div className="column-2">
              <div className="text-wrapper-2">{text}</div>
              <div className="text-wrapper-2">{text1}</div>
              <div className="text-wrapper-2">{text2}</div>
              <div className="nav-link-dropdown">
                <div className="text-wrapper-2">{text3}</div>
                <img className="chevron-down" alt="Chevron down" src="/img/chevron-down.svg" />
              </div>
            </div>
            <div className="actions">
              <Button
                className="button-instance"
                darkMode={false}
                iconPosition="no-icon"
                small
                style="secondary"
                text={buttonText}
              />
              <Button
                className={buttonStylePrimarySmallClassName}
                darkMode={false}
                divClassName={buttonDivClassName}
                iconPosition="no-icon"
                small
                style="primary"
                text={buttonText1}
              />
            </div>
          </div>
        </div>
      )}

      {breakpoint === "mobile" && (
        <>
          <div className="container-2">
            <div className="company-logo-wrapper">
              <CompanyLogo className="instance-node" color="dark" colorDark="/img/company-logo-3.png" />
            </div>
            <div className="icon">
              <IconX className="chevron-down" />
            </div>
          </div>
          <div className="row">
            <div className="column-3">
              <div className="column-4">
                <div className="div-wrapper">
                  <div className="text-wrapper-3">{text}</div>
                </div>
                <div className="div-wrapper">
                  <div className="text-wrapper-3">{text1}</div>
                </div>
                <div className="div-wrapper">
                  <div className="text-wrapper-3">{text2}</div>
                </div>
                <div className="div-wrapper">
                  <div className="nav-link-dropdown-2">
                    <div className="text-wrapper-3">{text3}</div>
                    <img className="chevron-down" alt="Chevron down" src="/img/chevron-down-1.svg" />
                  </div>
                </div>
              </div>
              <div className="actions-2">
                <Button
                  className="button-2"
                  darkMode={false}
                  iconPosition="no-icon"
                  small
                  style="secondary"
                  text="Button"
                />
                <Button
                  className="button-3"
                  darkMode={false}
                  iconPosition="no-icon"
                  small
                  style="primary"
                  text="Button"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Navbar.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  buttonText: PropTypes.string,
  buttonText1: PropTypes.string,
};
