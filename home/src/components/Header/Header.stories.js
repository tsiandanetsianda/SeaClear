import { Header } from ".";

export default {
  title: "Components/Header",
  component: Header,
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
    text: "Medium length hero heading goes here",
    text1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    buttonText: "Button",
    buttonDivClassName: {},
    buttonStylePrimarySmallClassName: {},
    buttonText1: "Button",
    placeholderImage: "/img/placeholder-image-4.png",
  },
};
