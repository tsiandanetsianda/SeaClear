import { TextInput } from ".";

export default {
  title: "Components/TextInput",
  component: TextInput,
  argTypes: {
    type: {
      options: ["default", "two-icons", "left-icon", "right-icon", "website-input", "input-with-dropdown"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    type: "default",
    className: {},
    text: "Placeholder",
    inputType: "text",
  },
};
