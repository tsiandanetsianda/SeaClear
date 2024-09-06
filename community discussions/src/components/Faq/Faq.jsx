/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Button } from "../Button";
import "./style.css";

export const Faq = ({
  breakpoint,
  className,
  text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  text1 = "Question text goes here",
  text2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  text3 = "Still have a questions?",
  text4 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
}) => {
  return (
    <div className={`FAQ breakpoint-18-${breakpoint} ${className}`}>
      <div className="section-title-3">
        <div className="text-wrapper-5">FAQs</div>
        <p className="text-3">{text}</p>
      </div>
      <div className="accordion">
        <div className="accordion-item">
          <div className="question">
            <div className="question-2">{text1}</div>
            <img className="img" alt="Icon" src="/img/icon-9.svg" />
          </div>
          <div className="answer">
            <p className="text-4">{text2}</p>
          </div>
        </div>
        <div className="accordion-item">
          <div className="question-3">
            <div className="question-4">{text1}</div>
            <img className="img" alt="Icon" src="/img/icon-9.svg" />
          </div>
          <div className="answer-2">
            <p className="text-5">{text2}</p>
          </div>
        </div>
        <div className="accordion-item">
          <div className="question-5">
            <div className="question-6">{text1}</div>
            <img className="img" alt="Icon" src="/img/icon-9.svg" />
          </div>
          <div className="answer-3">
            <p className="text-6">{text2}</p>
          </div>
        </div>
        <div className="accordion-item">
          <div className="question-7">
            <div className="question-8">{text1}</div>
            <img className="img" alt="Icon" src="/img/icon-9.svg" />
          </div>
          <div className="answer-4">
            <p className="text-7">{text2}</p>
          </div>
        </div>
        <div className="accordion-item">
          <div className="question-9">
            <div className="question-10">{text1}</div>
            <img className="img" alt="Icon" src="/img/icon-9.svg" />
          </div>
          <div className="answer-5">
            <p className="text-8">{text2}</p>
          </div>
        </div>
      </div>
      <div className="content-5">
        <div className="content-6">
          <div className="still-have-a">
            {breakpoint === "desktop" && <>{text3}</>}

            {breakpoint === "mobile" && <>Still have a question?</>}
          </div>
          <p className="text-9">{text4}</p>
        </div>
        <Button
          className="button-7"
          darkMode={false}
          iconPosition="no-icon"
          small={false}
          style="secondary"
          text="Contact"
        />
      </div>
    </div>
  );
};

Faq.propTypes = {
  breakpoint: PropTypes.oneOf(["desktop", "mobile"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
};
