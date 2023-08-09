const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Disables the dev 404 page. I find it mildly annoying.
  // @see https://github.com/gatsbyjs/gatsby/issues/16112
  if (process.env.NODE_ENV !== 'production' && page.path === '/404/') {
    // Make the 404 page match everything client side.
    // This will be used as fallback if more specific pages are not found
    page.matchPath = '/*';
    createPage(page);
  }

  // NOTE(dabrady) Markdown content must be explicitly published.
  if (page.context.frontmatter && !page.context.frontmatter.published) {
    deletePage(page);
  }
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  var { createNodeField } = actions;
  var fileNode = getNode(node.parent);

  /** Processing for Markdown and MDX */
  if (
    ['MarkdownRemark', 'Mdx'].includes(node.internal.type)
    && fileNode.internal.type == 'File'
  ) {
    // Generate page slug from filename if not provided in frontmatter.
    createNodeField(makeSlugField(node, getNode));

    // Extract and store the post excerpt, if present.
    createNodeField(makeExcerptField(node));
  }
};

/**** Helpers ****/

function makeSlugField(node, getNode) {
  var slug;
  if (node.frontmatter?.slug) {
    slug = node.frontmatter.slug;
  } else {
    slug = createFilePath({ node, getNode });
  }

  return {
    node,
    name: 'slug',
    value: slug,
  };
}

function makeExcerptField(node) {
  var [_, rawExcerpt] = node.body.split('{/* / */}');
  return {
    node,
    name: 'excerpt',
    value: rawExcerpt,
  };
}
