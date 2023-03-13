// Disables the dev 404 page. I find it mildly annoying.
// @see https://github.com/gatsbyjs/gatsby/issues/16112
exports.onCreatePage = ({ page, actions }) => {
  if (process.env.NODE_ENV !== `production` && page.path === `/404/`) {
    const { createPage } = actions;
    // Make the 404 page match everything client side.
    // This will be used as fallback if more specific pages are not found
    page.matchPath = `/*`;
    createPage(page);
  }
};
