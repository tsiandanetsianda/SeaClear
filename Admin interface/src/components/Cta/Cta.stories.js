import { Cta } from ".";

export default {
  title: "Components/Cta",
  component: Cta,
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
    text: "Medium length heading goes here",
    text1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    buttonStylePrimarySmallClassName: {},
    buttonText: "Button",
    buttonDivClassName: {},
    buttonText1: "Button",
  },
};
