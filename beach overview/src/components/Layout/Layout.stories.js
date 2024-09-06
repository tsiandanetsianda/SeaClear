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
    text: "Tagline",
    text1: "Medium length section heading goes here",
    text2:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    text3: "Subheading one",
    text4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    text5: "Subheading two",
    buttonText: "Button",
    buttonText1: "Button",
    placeholderImageClassName: {},
    placeholderImage: "/img/placeholder-image-2.png",
  },
};
