// theme
import { SairinConfig } from "@sairinjs/core";
import BlogTheme from "@sairinjs/sairin-theme-minimal";

export default {
  siteConfig: {
    title: "Sairin",
    url: "https://blog.sairinjs.com",
  },
  theme: BlogTheme,
  themeConfig: {
    title: `Sairin`,
    umami: {
      id: "75f22837-2714-4cec-b17f-5813a7950fcc",
      src: "https://a.taonan.lu/umami.js",
    },
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
