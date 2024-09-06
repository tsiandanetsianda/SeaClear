import { Portfolio } from ".";

export default {
  title: "Components/Portfolio",
  component: Portfolio,
  argTypes: {
    breakpoint: {
      options: ["desktop", "mobile"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    breakpoint: "desktop",
    className: {},
    text: "Portfolio",
    text1: "Short heading goes here",
    text2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    placeholderImage: "/img/placeholder-image-5.png",
    text3: "Project name here",
    textClassName: {},
    text4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    buttonText: "View project",
    img: "/img/placeholder-image-5.png",
    textClassNameOverride: {},
    buttonText1: "View project",
  },
};
