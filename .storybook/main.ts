import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {
    autodocs: true,
  },

  webpackFinal: async (config) => {
    const rules = config.module?.rules || [];
    rules.forEach((rule: any) => {
      if (rule.test?.toString().includes("css")) {
        const cssLoader = rule.use?.find((u: any) =>
          u.loader?.includes("css-loader")
        );
        if (cssLoader?.options) {
          delete cssLoader.options.url;
          delete cssLoader.options.import;
        }
      }
    });
    return config;
  },
};

export default config;
