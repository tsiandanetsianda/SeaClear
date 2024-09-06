/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { CompanyLogo } from "../CompanyLogo";
import "./style.css";

export const Footer = ({
  breakpoint,
  className,
  text = "Link One",
  text1 = "Link Two",
  text2 = "Link Three",
  text3 = "Link Four",
  divClassName,
  text4 = "Link Five",
  text5 = "© 2023 Relume. All rights reserved.",
  text6 = "Terms of Service",
  text7 = "Cookies Settings",
}) => {
  return (
    <div className={`footer breakpoint-65-${breakpoint} ${className}`}>
      <div className="content-13">
        <div className="logo">
          <CompanyLogo
            className="company-logo-2"
            color="dark"
            colorDark={breakpoint === "mobile" ? "/img/company-logo-1.png" : "/img/company-logo.png"}
          />
        </div>
        <div className="links">
          <div className="link-one">{text}</div>
          <div className="link-two">{text1}</div>
          <div className="link-three">{text2}</div>
          <div className="link-four">{text3}</div>
          <div className={`link-five ${divClassName}`}>{text4}</div>
        </div>
      </div>
      <div className="credits">
        <div className="divider" />
        <div className="row-3">
          <div className="element-relume-all">
            {breakpoint === "desktop" && <p className="text-wrapper-7">{text5}</p>}

            {breakpoint === "mobile" && (
              <>
                <div className="text-wrapper-4">Privacy Policy</div>
                <div className="text-wrapper-5">{text6}</div>
                <div className="text-wrapper-5">{text7}</div>
              </>
            )}
          </div>
          <div className="footer-links">
            {breakpoint === "desktop" && (
              <>
                <div className="text-wrapper-4">Privacy Policy</div>
                <div className="text-wrapper-4">{text6}</div>
                <div className="text-wrapper-4">{text7}</div>
              </>
            )}

            {breakpoint === "mobile" && <p className="text-wrapper-7">{text5}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  text5: PropTypes.string,
  text6: PropTypes.string,
  text7: PropTypes.string,
};
