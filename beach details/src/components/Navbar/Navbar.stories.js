import { Navbar } from ".";

export default {
  title: "Components/Navbar",
  component: Navbar,
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
    text: "Link One",
    text1: "Link Two",
    text2: "Link Three",
    text3: "Link Four",
    buttonText: "Button",
    buttonText1: "Button",
    buttonDivClassName: {},
    buttonStylePrimarySmallClassName: {},
  },
};
