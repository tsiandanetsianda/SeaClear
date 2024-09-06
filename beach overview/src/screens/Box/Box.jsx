import React from "react";
import { BreakpointDesktopWrapper } from "../../components/BreakpointDesktopWrapper";
import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { Navbar } from "../../components/Navbar";
import { Portfolio } from "../../components/Portfolio";
import { Testimonial } from "../../components/Testimonial";
import { TextInput } from "../../components/TextInput";
import { IconRelume42 } from "../../icons/IconRelume42";
import "./style.css";

export const Box = () => {
  return (
    <div className="box">
      <div className="beach-overview">
        <div className="beach-overview-2">
          <Navbar
            breakpoint="desktop"
            buttonDivClassName="design-component-instance-node"
            buttonStylePrimarySmallClassName="design-component-instance-node-2"
            buttonText="Learn"
            buttonText1="Sign Up"
            chevronDown="/img/chevron-down-2.svg"
            text="Beach Guide"
            text1="Water Quality"
            text2="Community"
            text3="More Options"
          />
          <Header
            breakpoint="desktop"
            className="header-46"
            divClassName="header-instance"
            text="Discover Cape Town&#39;s Beaches"
            text1="Explore beach details, weather conditions, water quality, and more."
          />
          <Portfolio
            breakpoint="desktop"
            buttonText="View Beach"
            buttonText1="View beach"
            className="design-component-instance-node-3"
            img="/img/placeholder-image-9.png"
            placeholderImage="/img/placeholder-image-8.png"
            text="Beaches"
            text1="Discover Cape Town&#39;s Beaches"
            text2="Explore the beautiful beaches of Cape Town"
            text3="Muizenberg Beach"
            text4="Learn more about the SeaClear Project"
            textClassName="portfolio-1"
            textClassNameOverride="portfolio-instance"
          />
          <Testimonial
            avatarImage="/img/avatar-image-2.png"
            breakpoint="desktop"
            className="testimonial-4"
            hasDivider={false}
            stars="/img/stars-2.svg"
            text="SeaClear has completely changed the way I find and explore beaches. It&#39;s incredibly user-friendly and provides all the information I need."
            text1="John Smith"
            text2="Beachgoer, Travel Co."
            visible={false}
          />
          <Layout
            breakpoint="desktop"
            buttonIcon={<IconRelume42 className="icon-relume-51" />}
            buttonText="Learn More"
            buttonText1="Sign Up"
            className="design-component-instance-node-3"
            placeholderImage="/img/placeholder-image-10.png"
            placeholderImageClassName="layout-4"
            text="Discover"
            text1="Current Weather Conditions for Each Beach"
            text2="Get real-time updates on the weather conditions at Cape Town&#39;s beaches. Plan your beach day accordingly."
            text3="Overview"
            text4="Beach Name - Water Quality: Good, Safe for Swimming"
            text5="Water Quality"
          />
          <BreakpointDesktopWrapper
            breakpoint="desktop"
            className="layout-3"
            placeholderImage="/img/placeholder-image-11.png"
            text="Water Quality Status: Making Informed Decisions for Your Beach Experience"
            text1="Our Beach Overview provides you with up-to-date water quality information for each beach, helping you decide where to go. Whether it&#39;s a good or bad indicator, we&#39;ve got you covered."
          />
          <div className="CTA">
            <div className="column-5">
              <div className="content-13">
                <p className="heading-6">Find Your Perfect Beach Here</p>
                <p className="text-10">Discover Cape Town&#39;s beautiful beaches and check their water quality.</p>
              </div>
              <div className="actions-4">
                <div className="form">
                  <TextInput className="text-input-instance" text="Enter your location" type="default" />
                  <Button
                    className="design-component-instance-node-2"
                    darkMode={false}
                    divClassName="design-component-instance-node"
                    iconPosition="no-icon"
                    small={false}
                    style="primary"
                    text="Search Now"
                  />
                </div>
                <p className="by-clicking-sign-up">By searching, you agree to our Terms and Conditions.</p>
              </div>
            </div>
          </div>
          <Footer
            breakpoint="desktop"
            className="design-component-instance-node-3"
            companyLogoColorDark="/img/company-logo-5.png"
            divClassName="footer-7"
            dividerClassName="footer-instance"
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
    </div>
  );
};
