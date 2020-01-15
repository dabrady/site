const path = require("path");

const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type == "Mdx") {
    const { createNodeField } = actions;
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: "slug",
      value: slug
    });
  }
};

exports.createPages = ({ graphql, actions }) =>
  new Promise((resolve, _) => {
    const { createPage } = actions;
    graphql(`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMdx.edges.forEach(({ node }) => {
        let pageData = {
          path: node.fields.slug,
          component: path.resolve("src/templates/blog-post.jsx"),
          context: {
            slug: node.fields.slug
          }
        };
        console.log("Creating page:", pageData);
        createPage(pageData);
      });
      resolve();
    });
  });
