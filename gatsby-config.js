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
        "@utils": path.resolve(__dirname, "src/utils"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@wip": path.resolve(__dirname, "wip")
      }
    },

    // This plugin adds support for the CSS-in-JS library Emotion.
    "gatsby-plugin-emotion",

    "gatsby-plugin-theme-ui",

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
        name: "src",
        path: `${__dirname}/src`
      }
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "a web site",
        short_name: "site",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "minimal-ui"
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet"
  ]
};
