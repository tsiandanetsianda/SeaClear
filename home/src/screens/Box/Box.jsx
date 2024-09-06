import React from "react";
import { BreakpointDesktopWrapper } from "../../components/BreakpointDesktopWrapper";
import { Cta } from "../../components/Cta";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { Navbar } from "../../components/Navbar";
import { Testimonial } from "../../components/Testimonial";
import "./style.css";

export const Box = () => {
  //const navigate = useNavigate();

  // Handling click events with navigation or other actions
  const handleClick = (buttonName) => {
    console.log(`${buttonName} button clicked!`);

    switch(buttonName) {
      case 'Learn':
        navigate('/learn'); // Navigate to the 'Learn' page
        break;
      case 'Sign Up':
        navigate('/signup'); // Navigate to the 'Sign Up' page
        break;
      case 'Explore':
        navigate('/BeachGuide'); // Navigate to the 'Explore' page
        break;
      case 'Report':
        navigate('/report'); // Navigate to the 'Report' page
        break;
      case 'Join Now':
        navigate('/join'); // Navigate to the 'Join' page
        break;
      case 'Educational Content':
        navigate('/EducationalContent'); // Navigate to the 'Educational Content' page
        break;
      default:
        console.log("No specific action assigned for this button.");
    }
  };

  return (
    <div className="box">
      <div className="home">
        <div className="home-2">
          <Navbar
            breakpoint="desktop"
            buttonDivClassName="design-component-instance-node"
            buttonStylePrimarySmallClassName="navbar-1"
            buttonText="Learn"
            buttonText1="Sign Up"
            text="Beach Guide"
            text1="Educational Content"
            text2="Community"
            text3="More Options"
            onClickLearn={() => handleClick('Learn')}
            onClickSignUp={() => handleClick('Sign Up')}
            onClickBeachGuide={() => handleClick('Explore')}
            onClickEDU={() => handleClick('Educational Content')}
          />
          <Header
            breakpoint="desktop"
            buttonDivClassName="design-component-instance-node"
            buttonStylePrimarySmallClassName="design-component-instance-node-3"
            buttonText="Explore"
            buttonText1="Learn More"
            className="design-component-instance-node-2"
            placeholderImage="/img/placeholder-image-6.png"
            text="Discover the Water Quality of Cape Town Beaches"
            text1="Explore the water quality status, weather conditions, and amenities of different beaches in Cape Town. Make informed decisions for your beach trips."
            onClickExplore={() => handleClick('Explore')}
          />
          <Layout
            breakpoint="desktop"
            buttonText="Learn More"
            buttonText1="Learn More"
            buttonText2="Join Now"
            className="design-component-instance-node-2"
            text="Understand"
            text1="Explore Cape Town's Beaches"
            text2="Engage with other beach-goers in the community"
            text3="Community Discussion"
            onClickJoinNow={() => handleClick('Join Now')}
          />
          <Testimonial
            breakpoint="desktop"
            className="design-component-instance-node-2"
            quoteClassName="testimonial-1"
            text="SeaClear Project has been an invaluable resource for me in choosing safe beaches. I can now easily access water quality information and make informed decisions."
            text1="John Doe"
            text2="Beachgoer, Cape Town"
            visible={false}
          />
          <BreakpointDesktopWrapper
            breakpoint="desktop"
            className="design-component-instance-node-2"
            placeholderImage="/img/placeholder-image-8.png"
            placeholderImageClassName="layout-3"
            text="Stay Informed, Ensure Safety, and Engage with the Community"
            text1="The SeaClear Project provides beach-goers with valuable information on water quality, allowing them to make informed decisions about which beaches to visit. With real-time weather updates, historical water quality data, and a community discussion forum, users can stay informed, ensure their safety, and engage with others who share their passion for the beach."
          />
          <Cta
            breakpoint="desktop"
            buttonDivClassName="design-component-instance-node"
            buttonStylePrimarySmallClassName="design-component-instance-node-3"
            buttonText="Report"
            buttonText1="Learn More"
            className="design-component-instance-node-2"
            text="Join the Community Discussion"
            text1="Share your experiences and help improve water quality in Cape Town beaches."
            onClickReport={() => handleClick('Report')}
          />
          <Footer
            breakpoint="desktop"
            className="design-component-instance-node-2"
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
