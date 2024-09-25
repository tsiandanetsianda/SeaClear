import { Layout } from ".";

export default {
  title: "Components/Layout",
  component: Layout,
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
    containerClassName: {},
    subheadingClassName: {},
    text: "Tagline",
    headingClassName: {},
    text1: "Medium length section heading goes here",
    textClassName: {},
    text2:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    numberClassName: {},
    textClassNameOverride: {},
    text3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    numberClassNameOverride: {},
    divClassName: {},
    buttonText: "Button",
    buttonDivClassName: {},
    buttonText1: "Button",
    buttonDivClassNameOverride: {},
    placeholderImageClassName: {},
    placeholderImage: "/img/placeholder-image-8.png",
  },
};
