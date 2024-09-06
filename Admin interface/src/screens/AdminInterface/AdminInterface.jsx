import React from "react";
import { BreakpointDesktopWrapper } from "../../components/BreakpointDesktopWrapper";
import { Cta } from "../../components/Cta";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import { Layout24 } from "../../components/Layout24";
import { Layout3 } from "../../components/Layout3";
import { Layout4 } from "../../components/Layout4";
import { Layout89 } from "../../components/Layout89";
import { Navbar } from "../../components/Navbar";
import { IconRelume49 } from "../../icons/IconRelume49";
import "./style.css";

export const AdminInterface = () => {
  return (
    <div className="admin-interface">
      <div className="div-2">
        <Navbar
          breakpoint="desktop"
          buttonDivClassName="design-component-instance-node"
          buttonStylePrimarySmallClassName="navbar-1"
          buttonText="Learn"
          buttonText1="Sign Up"
          text="Beach Guide"
          text1="Water Quality"
          text2="Community"
          text3="More Options"
        />
        <div className="header">
          <div className="content-14">
            <p className="short-heading-here">
              <span className="span">Manage SeaClear (</span>
              <span className="text-wrapper-6">Only Available to admin account)</span>
            </p>
            <p className="lorem-ipsum-dolor">
              Access the powerful admin interface to monitor usage, moderate content, and edit beach profiles.
            </p>
          </div>
        </div>
        <Layout
          breakpoint="desktop"
          buttonText="Explore"
          buttonText1="Edit"
          className="design-component-instance-node-2"
          text="Efficiency"
          text1="View Reports"
          text2="Take control of your beach management with our powerful admin interface. Monitor usage, support moderation, view reports, and easily edit beach profiles."
          text3="Access comprehensive reports to gain valuable insights."
        />
        <BreakpointDesktopWrapper
          breakpoint="desktop"
          buttonText="Learn More"
          buttonText1="Sign Up"
          className="design-component-instance-node-2"
          text="Insights"
          text1="User Interactions and Beach Data Views"
          text2="Gain detailed analytics on user interactions and views of beach data to understand user behavior and preferences."
          text3="Analyze user behavior and preferences for optimization"
        />
        <Layout4
          breakpoint="desktop"
          buttonIcon={<IconRelume49 className="icon-relume-49-instance" />}
          buttonText="View"
          buttonText1="Edit"
          className="design-component-instance-node-2"
          text="Manage"
          text1="Moderation Tools for Community Discussions and Reports"
          text2="Our admin interface provides you with powerful tools to moderate community discussions and reports. Ensure a safe and respectful environment for all users."
          text3="Discussion"
          text4="Effortlessly handle and address user reports to maintain the integrity of the platform."
          text5="Reports"
        />
        <Layout89
          breakpoint="desktop"
          buttonStylePrimarySmallClassName="layout-instance"
          buttonText="Access Report data base"
          className="design-component-instance-node-2"
          text="Explore"
          text1="Community Reports and Water Quality Measurements"
          text2="Access and review community reports and water quality measurements to stay informed about the current state of Cape Town beaches."
          visible={false}
        />
        <Layout3
          breakpoint="desktop"
          className="design-component-instance-node-2"
          text="Effortlessly update and manage beach information with our intuitive interface."
          text1="Our Admin Interface provides a user-friendly platform for editing beach profiles. Easily modify details such as pictures, names, locations, and basic amenities to ensure accurate and up-to-date information for beach-goers."
        />
        <Layout24
          breakpoint="desktop"
          className="design-component-instance-node-2"
          text="Integration with CoCT Reports: Streamline data entry and upload capabilities for water quality information."
          text1="Our admin interface allows for easy manual entry or spreadsheet upload of CoCT water quality reports. Stay up to date with the latest information."
        />
        <Cta
          breakpoint="desktop"
          buttonDivClassName="design-component-instance-node"
          buttonStylePrimarySmallClassName="CTA-13"
          buttonText="Monitor"
          buttonText1="Update"
          className="design-component-instance-node-2"
          text="Ensure data accuracy and reliability"
          text1="Regularly monitor and update data to ensure the platform&#39;s accuracy and reliability. This will help provide beach-goers with the most up-to-date information on water quality in Cape Town beaches."
        />
        <Footer
          breakpoint="desktop"
          className="design-component-instance-node-2"
          divClassName="footer-7"
          text="Join Us"
          text1="Get Involved"
          text2="Share Ideas"
          text3="Support Us"
          text4="Contact Us"
          text5="© 2024 SeaClear Project. All rights reserved."
          text6="Terms and Conditions"
          text7="Cookie Policy"
        />
      </div>
    </div>
  );
};
