import { Layout1 } from ".";

export default {
  title: "Components/Layout1",
  component: Layout1,
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
    buttonText: "Button",
    buttonText1: "Button",
  },
};
