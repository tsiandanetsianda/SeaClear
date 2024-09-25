import { BreakpointDesktopWrapper } from ".";

export default {
  title: "Components/BreakpointDesktopWrapper",
  component: BreakpointDesktopWrapper,
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
    headingClassName: {},
    text: "Long heading is what you see here in this feature section",
    textClassName: {},
    text1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    hasNumber: true,
    textClassNameOverride: {},
    text2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    listItemClassName: {},
    hasDiv: true,
    hasPlaceholderImage: true,
  },
};
