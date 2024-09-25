import { Testimonial } from ".";

export default {
  title: "Components/Testimonial",
  component: Testimonial,
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
    stars: "/img/stars.svg",
    text:
      "&#34;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.&#34;",
    text1: "Name Surname",
    text2: "Position, Company name",
    dividerClassName: {},
    divider: "/img/divider.svg",
    visible: true,
  },
};
