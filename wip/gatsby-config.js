const path = require("path");

module.exports = {
  plugins: [
    {
      // This plugin transforms Markdown into HTML.
      resolve: "gatsby-transformer-remark",
      options: {
        // `excerpt_separator` specifies a string that is used to demarcate
        // a section of a Markdown file to use as an excerpt, or "preview".
        excerpt_separator: `<!-- / -->`,
        plugins: [
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "a web log",
        short_name: "Blog",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "minimal-ui",
        icon: "wip/images/gatsby-icon.png" // This path is relative to the root of the site.
      }
    }
  ]
};
