const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  var { createPage } = actions;

  // Make pages for MDX content.
  for (let page of (await makeFromMDX(graphql, reporter))) {
    createPage(page);
  }
};

// Disables the dev 404 page. I find it mildly annoying.
// @see https://github.com/gatsbyjs/gatsby/issues/16112
exports.onCreatePage = ({ page, actions }) => {
  if (process.env.NODE_ENV !== 'production' && page.path === '/404/') {
    const { createPage } = actions;
    // Make the 404 page match everything client side.
    // This will be used as fallback if more specific pages are not found
    page.matchPath = '/*';
    createPage(page);
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

async function makeFromMDX(graphql, reporter) {
  var result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
  }

  var posts = result.data.allMdx.nodes;
  // TODO(dabrady) Design a real layout.
  var postTemplate = path.resolve('./src/components/MainLayout.jsx');
  return posts.map((post) => ({
    path: post.fields.slug,
    // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
    component: `${postTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
    // You can use the values in this context in our page layout component
    context: { id: post.id },
  }));
}

function makeSlugField(node, getNode) {
  var slug;
  if (node.frontmatter?.slug) {
    slug = node.frontmatter.slug;
  } else {
    slug = createFilePath({ node, getNode, basePath: 'src/content' });
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
