import React from "react";
import { BreakpointDesktopWrapper } from "../../components/BreakpointDesktopWrapper";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import { Layout10 } from "../../components/Layout10";
import { Layout6 } from "../../components/Layout6";
import { LayoutWrapper } from "../../components/LayoutWrapper";
import { Navbar } from "../../components/Navbar";
import { IconRelume49 } from "../../icons/IconRelume49";
import "./style.css";

export const BeachDetails = () => {
  return (
    <div className="beach-details">
      <div className="div-2">
        <Navbar
          breakpoint="desktop"
          buttonDivClassName="navbar-instance"
          buttonStylePrimarySmallClassName="navbar-1-instance"
          buttonText="Learn"
          buttonText1="Sign Up"
          className="navbar-1"
          text="Beach Guide"
          text1="Water Quality"
          text2="Community"
          text3="More Options"
        />
        <div className="overlap-group">
          <div className="portfolio-header">
            <div className="content-13">
              <div className="column-6">
                <div className="content-14">
                  <div className="heading-6">CAMPS BAY</div>
                  <div className="text-8">Location:</div>
                </div>
                <div className="tags">
                  <div className="tag">
                    <div className="tag-one">Beach Overview</div>
                  </div>
                  <div className="tag">
                    <div className="tag-two">Water Quality</div>
                  </div>
                  <div className="tag">
                    <div className="tag-three">Beach Activity</div>
                  </div>
                </div>
              </div>
              <div className="list-5">
                <div className="content-15">
                  <div className="list-item-9">
                    <div className="text-9">Weather Conditions</div>
                    <p className="text-10">
                      <span className="span">Temp</span>
                      <span className="text-wrapper-10">:</span>
                    </p>
                  </div>
                  <div className="list-item-10">
                    <div className="text-11">Date</div>
                    <div className="text-12">March 2024</div>
                  </div>
                </div>
                <div className="content-16">
                  <div className="list-item-11">
                    <div className="text-9">Wind:</div>
                    <div className="text-13">Condition:</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame">
            <Layout
              breakpoint="desktop"
              buttonDivClassName="layout-25-instance"
              buttonDivClassNameOverride="layout-25-instance"
              buttonIcon={<IconRelume49 className="icon-instance-node" />}
              buttonText="Learn More"
              buttonText1="Explore Now"
              className="layout-25"
              containerClassName="layout-instance"
              divClassName="layout-25-instance"
              headingClassName="layout-25-instance"
              numberClassName="layout-25-instance"
              numberClassNameOverride="layout-25-instance"
              placeholderImage="/img/placeholder-image-10.png"
              placeholderImageClassName="layout-2"
              subheadingClassName="layout-25-instance"
              text="Informative"
              text1="Get the Latest Weather Forecast for Beaches"
              text2="Stay updated on wind, temperature, and rain conditions with our current and weekend forecast."
              text3="Stay Prepared for Your Beach Adventure"
              textClassName="layout-25-instance"
              textClassNameOverride="layout-25-instance"
            />
          </div>
        </div>
        <div className="overlap">
          <BreakpointDesktopWrapper
            breakpoint="desktop"
            className="layout-27"
            containerClassName="layout-27-instance"
            hasDiv={false}
            hasNumber={false}
            hasPlaceholderImage={false}
            headingClassName="layout-3"
            listItemClassName="layout-7"
            text="Discover the Beach&#39;s Amenities"
            text1="Find out about the basic beach amenities available, including restrooms, lifeguards, and parking."
            text2="Enjoy the beach with all the necessary amenities provided."
            textClassName="layout-4"
            textClassNameOverride="layout-5"
          />
          <Layout10
            breakpoint="desktop"
            buttonIcon={<IconRelume49 className="icon-instance-node" />}
            buttonText="Learn More"
            buttonText1="Sign Up"
            className="layout-10-instance"
            text="Informative"
            text1="Water Quality Information for Beachgoers"
            text2="Stay informed about the current and historical water quality at your favorite beaches with our comprehensive data. Our SAFE/NOT SAFE indicator helps you make informed decisions."
            text3="Current"
            text4="Access historical water quality data to track trends and patterns."
            text5="Historical"
          />
        </div>
        <Layout6
          breakpoint="desktop"
          className="layout-6-instance"
          containerClassName="layout-8"
          contentClassName="layout-9"
          placeholderImage="/img/placeholder-image-12.png"
          text="Discover Exciting Beach Activities for a Fun-filled Day in the Sun"
          text1="Whether you&#39;re into swimming, surfing, or picnicking, our beaches offer something for everyone."
          text2="Swimming"
          text3="Catch the perfect wave and experience the thrill of riding the surf."
          text4="Surfing"
        />
        <LayoutWrapper className="layout-90" />
        <Footer
          breakpoint="desktop"
          className="footer-7"
          divClassName="footer-instance"
          text="Join Us"
          text1="Get Involved"
          text2="Share Ideas"
          text3="Support Us"
          text4="Contact Us"
          text5="© 2024 SeaClear Project. All rights reserved."
          text6="Terms and Conditions"
          text7="Cookie Policy"
        />
        <img className="rectangle" alt="Rectangle" src="/img/rectangle-1.png" />
      </div>
    </div>
  );
};
