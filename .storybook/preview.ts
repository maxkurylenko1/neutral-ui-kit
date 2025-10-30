import "../styles/globals.css";
import React from "react";
import { TooltipProvider } from "../components/ui/tooltip";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};

interface StoryComponent {
  (): JSX.Element;
}

interface Decorator {
  (Story: StoryComponent): JSX.Element;
}

export const decorators: Decorator[] = [
  (Story: StoryComponent) =>
    React.createElement(TooltipProvider, null, React.createElement(Story)),
];
