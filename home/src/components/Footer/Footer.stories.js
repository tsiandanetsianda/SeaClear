import { Footer } from ".";

export default {
  title: "Components/Footer",
  component: Footer,
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
    divClassName: {},
    text4: "Link Five",
    dividerClassName: {},
    text5: "© 2023 Relume. All rights reserved.",
    text6: "Terms of Service",
    text7: "Cookies Settings",
  },
};
