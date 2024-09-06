import React from "react";
import { BreakpointDesktopWrapper } from "../../components/BreakpointDesktopWrapper";
import { Button } from "../../components/Button";
import { Cta } from "../../components/Cta";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { Layout1 } from "../../components/Layout1";
import { Layout238 } from "../../components/Layout238";
import { Navbar } from "../../components/Navbar";
import { TextInput } from "../../components/TextInput";
import { IconRelume52 } from "../../icons/IconRelume52";
import { IconRelume57 } from "../../icons/IconRelume57";
import "./style.css";

export const EducationalContent = () => {
  return (
    <div className="educational-content">
      <div className="div-2">
        <Navbar
          breakpoint="desktop"
          buttonDivClassName="design-component-instance-node"
          buttonStylePrimarySmallClassName="design-component-instance-node-2"
          buttonText="Learn"
          buttonText1="Sign Up"
          text="Beach Guide"
          text1="Water Quality"
          text2="Community"
          text3="More Options"
        />
        <Header
          breakpoint="desktop"
          className="header-54"
          text="Understanding Water Quality"
          text1="Learn about the importance of water quality and access educational resources."
        />
        <Layout
          breakpoint="desktop"
          className="design-component-instance-node-3"
          text="Understanding the Importance of Water Quality: Health and Environmental Impacts"
          text1="Water quality plays a crucial role in both human health and the environment. Poor water quality can lead to various health issues and harm aquatic ecosystems. It is important to understand the impact of water quality on our well-being and the planet."
        />
        <BreakpointDesktopWrapper
          breakpoint="desktop"
          buttonText="Learn More"
          buttonText1="Sign Up"
          className="design-component-instance-node-3"
          text="Informative"
          text1="Understanding Water Quality: Key Terms Explained"
          text2="Learn about the important terms and metrics used to assess water quality and make informed decisions about your beach visits."
        />
        <Layout1
          breakpoint="desktop"
          buttonIcon={<IconRelume57 className="icon-instance-node" />}
          buttonText="Learn More"
          buttonText1="Sign Up"
          className="design-component-instance-node-3"
          text="Informative"
          text1="Assessing Water Quality: Tips and Guidelines"
          text2="Learn how to check water quality yourself and make informed decisions when visiting the beach. Follow these tips and guidelines to ensure a safe and enjoyable experience."
        />
        <Layout238
          breakpoint="desktop"
          buttonIcon={<IconRelume52 className="icon-instance-node" color="black" />}
          buttonIcon1={<IconRelume52 className="icon-instance-node" color="black" />}
          buttonText="Learn More"
          buttonText1="Learn More"
          buttonText2="Learn More"
          className="design-component-instance-node-3"
          override={<IconRelume52 className="icon-instance-node" color="black" />}
          text="Additional Resources: Links to external organizations focused on water quality and beach safety"
          text1="Access additional resources and organizations dedicated to water quality and beach safety."
        />
        <Cta
          breakpoint="desktop"
          buttonDivClassName="design-component-instance-node"
          buttonStylePrimarySmallClassName="CTA-instance"
          buttonText="Participate"
          buttonText1="Learn More"
          className="CTA-3"
          text="Join the Water Quality Discussion"
          text1="Share your knowledge and experiences with others to improve beach water quality."
        />
        <div className="container-wrapper">
          <div className="container-6">
            <div className="content-15">
              <p className="heading-9">Stay Informed with Our Newsletter</p>
              <p className="text-7">Receive updates and educational content via email</p>
            </div>
            <div className="actions-6">
              <div className="form">
                <TextInput className="text-input-instance" text="Your email address" type="default" />
                <Button
                  className="design-component-instance-node-2"
                  darkMode={false}
                  divClassName="design-component-instance-node"
                  iconPosition="no-icon"
                  small={false}
                  style="primary"
                  text="Subscribe Now"
                />
              </div>
              <p className="by-clicking-sign-up">By subscribing, you agree to our Terms and Conditions.</p>
            </div>
          </div>
        </div>
        <Footer
          breakpoint="desktop"
          className="design-component-instance-node-3"
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
