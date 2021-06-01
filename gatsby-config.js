var path = require("path");
var { createProxyMiddleware } = require("http-proxy-middleware");
// Load any configured environment-specific variables.
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: "@here",
    description: "",
    author: "@dabrady"
  },

  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: function proxyNetlifyLambdas(app) {
    app.use(
      "/.netlify/functions/",
      createProxyMiddleware({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": ""
        }
      })
    );
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

    // This plugin adds support for the CSS-in-JS library Theme UI.
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
        display: "minimal-ui",
        // TODO(dabrady): Make a real icon
        icon: 'src/images/gatsby-icon.png'
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-eslint"
  ]
};
