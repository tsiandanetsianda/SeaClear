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
    text1: "Short heading goes here",
    text2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    text3: "Medium length section heading goes here",
    buttonText: "Button",
    buttonText1: "Button",
    buttonText2: "Button",
  },
};
