This directory is here to shadow the internal `gatsby-plugin-theme-ui` [as recommended](https://www.gatsbyjs.com/plugins/gatsby-plugin-theme-ui/#customizing-the-theme) for customizing themes.

It's possible to specify a different location for the theme in the plugin config, but my theme depends on ES6 modules and the Gatsby plugin config does not support ES6 module loading, which causes me pain, but less pain than having this ugly directory name in my website source.
