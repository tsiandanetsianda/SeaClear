/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Button } from "../Button";
import "./style.css";

export const LayoutWrapper = ({ className }) => {
  return (
    <div className={`layout-wrapper ${className}`}>
      <div className="heading-wrapper">
        <div className="heading-5">Current beach Comments</div>
      </div>
      <div className="column-wrapper">
        <div className="column-5" />
      </div>
      <p className="text-suspendisse">Add disclamers what shouldn’t be done</p>
      <div className="text-wrapper-4">COMMENTS (3)</div>
      <div className="text-wrapper-5">User</div>
      <div className="text-wrapper-6">User</div>
      <div className="text-wrapper-7">User</div>
      <div className="ellipse" />
      <Button
        className="design-component-instance-node"
        darkMode={false}
        iconPosition="no-icon"
        small={false}
        style="secondary"
        text="Comment 1 ...."
      />
      <div className="ellipse-2" />
      <Button
        className="button-8"
        darkMode={false}
        iconPosition="no-icon"
        small={false}
        style="secondary"
        text="Comment 2"
      />
      <div className="ellipse-3" />
      <Button
        className="button-9"
        darkMode={false}
        iconPosition="no-icon"
        small={false}
        style="secondary"
        text="Comment&nbsp;&nbsp;3"
      />
    </div>
  );
};
