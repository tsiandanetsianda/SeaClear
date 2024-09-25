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
    text: "Tagline",
    text1: "Short heading here",
    text2:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    buttonDivClassName: {},
    buttonStylePrimarySmallClassName: {},
    buttonText: "Button",
    buttonText1: "Button",
  },
};
