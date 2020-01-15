const path = require("path");

module.exports = {
  siteMetadata: {
    title: "@here",
    description: "",
    author: "@dabrady"
  },

  plugins: [
    {
      // This plugin allows us to alias common import paths to short names.
      resolve: "gatsby-plugin-root-import",
      options: {
        "@components": path.resolve(__dirname, "src/components"),
        "@utils": path.resolve(__dirname, "src/utils")
      }
    },
    {
      // This plugin transforms Markdown + JSX into HTML.
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          // A plugin to render emoji in markdown.
          "gatsby-remark-emoji",
          // A plugin to replace "dumb" punctuation marks with "smart" punctuation marks.
          {
            resolve: "gatsby-remark-smartypants",
            options: {
              dashes: "oldschool"
            }
          }
        ]
      }
    },
    // These 'sharp' plugins provide handy utilities for working with images.
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",

    // This plugin adds support for the CSS-in-JS library Emotion.
    "gatsby-plugin-emotion",

    // This plugin intercepts all local links that have not been created in
    // React using gatsby-link, and replaces their behavior with that of the
    // gatsby-link navigate. This avoids the browser having to refresh the
    // whole page when navigating between local pages
    "gatsby-plugin-catch-links",

    // This plugin parses local files into 'File' nodes for further manipulation
    // by transformers within our application.
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`
      }
    },

    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography/index.js"
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "a web log",
        short_name: "Blog",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png" // This path is relative to the root of the site.
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet"
  ]
};
