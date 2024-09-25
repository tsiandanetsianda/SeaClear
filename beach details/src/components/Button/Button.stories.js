import { Button } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    style: {
      options: ["primary", "link", "secondary", "tertiary"],
      control: { type: "select" },
    },
    iconPosition: {
      options: ["no-icon", "trailing", "only", "leading"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    style: "primary",
    small: true,
    darkMode: true,
    iconPosition: "no-icon",
    className: {},
    text: "Button",
    divClassName: {},
    divClassNameOverride: {},
  },
};
