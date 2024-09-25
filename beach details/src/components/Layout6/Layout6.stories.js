import { Layout6 } from ".";

export default {
  title: "Components/Layout6",
  component: Layout6,
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
    contentClassName: {},
    text: "Long heading is what you see here in this feature section",
    text1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    text2: "Subheading one",
    text3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    text4: "Subheading two",
    placeholderImage: "/img/placeholder-image-8.png",
  },
};
