import type { Preview } from "@storybook/react";
// Load Tailwind v4 + design tokens so every story renders with SSOT tokens.
import "../src/index.css";

const preview: Preview = {
  // autodocs on every component (design-system requirement).
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
