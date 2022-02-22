// theme
import { SairinConfig } from "@sairinjs/core";
import BlogTheme from "@sairinjs/sairin-theme-minimal";

export default {
  theme: BlogTheme,
  themeConfig: {
    title: `Sairin`,
    links: [
      {
        title: "GitHub",
        url: "https://github.com/djyde/sairin",
      },
      {
        title: "Twitter",
        url: "https://twitter.com/randyloop",
      },
    ],
  },
} as SairinConfig;
