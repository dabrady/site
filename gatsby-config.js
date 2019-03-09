const path = require("path");

module.exports = {
  siteMetadata: {
    title: "@here",
    description: "",
    author: "@dabrady"
  },

  plugins: [
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "@components": path.resolve(__dirname, "src/components"),
        "@utils": path.resolve(__dirname, "src/utils")
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: { excerpt_separator: `<!-- / -->` }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src`
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
