import { Layout238 } from ".";

export default {
  title: "Components/Layout238",
  component: Layout238,
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
    text: "Long heading is what you see here in this feature section",
    text1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
    buttonText: "Button",
    buttonText1: "Button",
    buttonText2: "Button",
  },
};
