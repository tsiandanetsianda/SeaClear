import { CompanyLogo } from ".";

export default {
  title: "Components/CompanyLogo",
  component: CompanyLogo,
  argTypes: {
    color: {
      options: ["dark", "light"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    color: "dark",
    className: {},
    colorDark: "/img/color-dark.png",
  },
};
