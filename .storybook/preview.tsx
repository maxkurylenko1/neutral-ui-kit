import "../styles/globals.css";
import React from "react";
import { TooltipProvider } from "../components/ui/tooltip";
import { ThemeProvider } from "../components/theme-provider";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  backgrounds: {
    default: "app",
    values: [
      { name: "app", value: "hsl(0 0% 100%)" },
      { name: "dark", value: "hsl(240 10% 3.9%)" },
    ],
  },
  a11y: {
    element: "#root",
    manual: false,
  },
  themes: {
    default: "light",
    list: [
      { name: "light", class: "light", color: "#ffffff" },
      { name: "dark", class: "dark", color: "#000000" },
    ],
  },
};

interface StoryComponent {
  (): JSX.Element;
}

export const decorators = [
  (Story: StoryComponent) => (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    </ThemeProvider>
  ),
];
