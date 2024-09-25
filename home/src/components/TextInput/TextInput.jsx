/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { ButtonIconHelpCircle1 } from "../../icons/ButtonIconHelpCircle1";
import { IconChevronDown } from "../../icons/IconChevronDown";
import { IconCreditCard } from "../../icons/IconCreditCard";
import { IconSearch } from "../../icons/IconSearch";
import "./style.css";

export const TextInput = ({ type, className, text = "Placeholder", inputType = "text" }) => {
  return (
    <div className={`text-input ${type} ${className}`}>
      {type === "two-icons" && <IconCreditCard className="instance-node-2" />}

      {["default", "right-icon", "two-icons"].includes(type) && <div className="text-wrapper-4">{text}</div>}

      {["right-icon", "two-icons"].includes(type) && <ButtonIconHelpCircle1 className="instance-node-2" />}

      {type === "left-icon" && (
        <>
          <IconSearch className="instance-node-2" />
          <div className="text-wrapper-4">Search</div>
        </>
      )}

      {["input-with-dropdown", "website-input"].includes(type) && (
        <>
          <div className="select">
            <div className="type-your-message">
              {type === "website-input" && <>http://</>}

              {type === "input-with-dropdown" && <>USD</>}
            </div>
            {type === "input-with-dropdown" && <IconChevronDown className="icon-chevron-down" />}
          </div>
          <input
            className="type-your-message-wrapper"
            placeholder={type === "input-with-dropdown" ? text : type === "website-input" ? "www.relume.io" : undefined}
            type={inputType}
          />
        </>
      )}
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.oneOf(["default", "two-icons", "left-icon", "right-icon", "website-input", "input-with-dropdown"]),
  text: PropTypes.string,
  inputType: PropTypes.string,
};
