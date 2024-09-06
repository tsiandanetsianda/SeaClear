import React from "react";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Cta } from "../../components/Cta";
import { Faq } from "../../components/Faq";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { Navbar } from "../../components/Navbar";
import { Testimonial } from "../../components/Testimonial";
import { TextArea } from "../../components/TextArea";
import { TextInput } from "../../components/TextInput";
import { IconEnvelope2 } from "../../icons/IconEnvelope2";
import { IconMap2 } from "../../icons/IconMap2";
import { IconPhone1 } from "../../icons/IconPhone1";
import "./style.css";

export const CommunityDiscussion = () => {
  return (
    <div className="community-discussion">
      <div className="div-3">
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
        <Header
          breakpoint="desktop"
          buttonDivClassName="design-component-instance-node"
          buttonStylePrimarySmallClassName="design-component-instance-node-3"
          buttonText="Learn More"
          buttonText1="Sign Up"
          className="design-component-instance-node-2"
          text="Connect"
          text1="Join the Discussion"
          text2="Share and Moderate Beach-Related Information with the Community"
        />
        <Layout
          breakpoint="desktop"
          buttonText="Join"
          buttonText1="Learn More"
          className="design-component-instance-node-2"
          text="Engage"
          text1="Moderation Tools"
          text2="Join the conversation and share your thoughts."
          text3="Ensure a safe and respectful community environment."
        />
        <Faq
          breakpoint="desktop"
          className="design-component-instance-node-2"
          text="Find answers to commonly asked questions about participating in and moderating discussions."
          text1="Still have questions?"
          text2="If you still have unanswered questions, please reach out to us using the contact information provided below."
          text3="Contact Us"
          text4="Need further assistance? Get in touch with us."
        />
        <Cta
          breakpoint="desktop"
          buttonDivClassName="design-component-instance-node"
          buttonStylePrimarySmallClassName="design-component-instance-node-3"
          buttonText="Join"
          buttonText1="Learn More"
          className="design-component-instance-node-2"
          text="Join the Community Discussion Today"
          text1="Share your experiences and insights with fellow beach-goers. Contribute to community reports and help improve water quality."
        />
        <div className="contact">
          <div className="container-5">
            <div className="content-11">
              <div className="section-title-4">
                <div className="subheading-2">Join our team</div>
                <div className="content-12">
                  <div className="heading-5">Get in touch</div>
                  <p className="lorem-ipsum-dolor-2">Fill out the form below to apply as a community moderator</p>
                </div>
              </div>
              <div className="content-13">
                <div className="row-4">
                  <IconEnvelope2 className="icon-instance-node" />
                  <div className="text-wrapper-9">hello@seaclearproject.com</div>
                </div>
                <div className="row-4">
                  <IconPhone1 className="icon-instance-node" />
                  <div className="text-wrapper-9">+27 123 567 8920</div>
                </div>
                <div className="row-4">
                  <IconMap2 className="icon-instance-node" />
                  <p className="text-wrapper-9">123 Ocean Ave, Cape Town, South Africa</p>
                </div>
              </div>
            </div>
            <div className="form">
              <div className="input">
                <div className="text-wrapper-10">Name</div>
                <TextInput className="text-input-instance" hasDiv={false} type="default" />
              </div>
              <div className="input">
                <div className="text-wrapper-10">Email</div>
                <TextInput className="text-input-instance" hasDiv={false} type="default" />
              </div>
              <div className="input">
                <div className="text-wrapper-10">Message</div>
                <TextArea
                  className="text-area-instance"
                  line="/img/line-1-1.svg"
                  lineClassName="text-area-2"
                  lineClassNameOverride="text-area-3"
                  text="Type your message here"
                />
              </div>
              <Checkbox
                className="checkbox-instance"
                labelClassName="checkbox-2"
                selected={false}
                text="I agree to the Terms"
              />
              <Button
                className="button-9"
                darkMode={false}
                divClassName="design-component-instance-node"
                iconPosition="no-icon"
                small={false}
                style="primary"
                text="Submit"
              />
            </div>
          </div>
        </div>
        <Testimonial
          breakpoint="desktop"
          className="design-component-instance-node-2"
          divider="/img/divider-2.svg"
          dividerClassName="testimonial-15"
          stars="/img/stars-2.svg"
          text="The community discussion platform has been invaluable in connecting beach-goers and fostering a sense of community."
          text1="John Doe"
          text2="Beach Enthusiast, BeachCo"
          visible={false}
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
