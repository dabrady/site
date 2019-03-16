import { css } from "@emotion/core";
import { graphql, Link } from "gatsby";
import React, { useEffect, useReducer, useRef } from "react";
import gray from "gray-percentage";

import { rhythm } from "@utils/typography";
import Layout from "@components/layout";
import SEO from "@components/seo";
import useEventListener from "@utils/hooks/useEventListener";

const dateWidth = rhythm(3.4);
const postDate = css`
  width: ${dateWidth};
  float: left;
  text-align: right;

  h6 {
    margin-top: ${0};
    margin-right: ${rhythm(2 / 3)};
    color: ${gray(10, 0, true)};
    font-style: italic;
  }
`;

const postLink = css`
  margin-left: ${dateWidth};
  margin-bottom: ${rhythm(1 / 4)};
`;

//---------
function PostCarousel(props) {
  const PostCarouselStyles = css``;
  return <section css={PostCarouselStyles} {...props} />;
}

function PostListings(props) {
  const PostListingsStyles = css`
    margin-left: 0;
    list-style-type: none;
  `;
  return <ul css={PostListingsStyles} {...props} />;
}

function PostDate({ postDate }) {
  const PostDateStyles = css`
    width: ${dateWidth};
    float: left;
    text-align: right;

    h6 {
      margin-top: ${0};
      margin-right: ${rhythm(2 / 3)};
      color: ${gray(10, 0, true)};
      font-style: italic;
    }
  `;
  return (
    <div css={PostDateStyles}>
      <h6>{postDate}</h6>
    </div>
  );
}

function PostListing({
  id,
  postDate,
  postTitle,
  postExcerpt,
  postPath,
  onClick,
  isCurrent
}) {
  const listing = useRef();
  useEffect(
    () => {
      if (isCurrent) {
        listing.current.focus();
      }
    },
    [isCurrent]
  );

  // TODO Remove default style of 'focused' element.
  const PostListingStyles = css``;
  const PostExcerptStyles = css`
    margin-left: ${dateWidth};
    margin-bottom: ${rhythm(1 / 4)};
  `;
  return (
    <li ref={listing} css={PostListingStyles} onClick={onClick}>
      <PostDate postDate={postDate} />
      <div css={PostExcerptStyles}>
        <h1 id={id}>{postTitle}</h1>
        {/* I only want the current selection to be verbose. */}
        {isCurrent && (
          <Link to={postPath}>
            <p>{postExcerpt}</p>
          </Link>
        )}
      </div>
    </li>
  );
}

//---------

const IndexPage = ({ data }) => {
  const postNodes = data.allMarkdownRemark.edges;
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "PREV":
          console.log("previous");
          return {
            ...state,
            currentIndex: state.currentIndex == 0 ? 0 : state.currentIndex - 1
          };
        case "NEXT":
          console.log("next");
          return {
            ...state,
            currentIndex:
              state.currentIndex == postNodes.length - 1
                ? state.currentIndex
                : state.currentIndex + 1
          };
        // TODO Make focus navigation a thing.
        case "GOTO":
          console.log("going to " + action.index);
          return {
            ...state,
            currentIndex: action.index
          };
        default:
          return state;
      }
    },
    {
      currentIndex: postNodes.length - 1 // default to most recent post
    }
  );

  useEventListener("keydown", function navigateWithKeyboard(event) {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        return dispatch({ type: "PREV" });
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        return dispatch({ type: "NEXT" });
      default:
        return;
    }
  });

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <PostCarousel>
        <PostListings>
          {postNodes.map(({ node }, index) => (
            <PostListing
              key={index}
              id={`post-${index}`}
              postTitle={node.frontmatter.title}
              postDate={node.frontmatter.date}
              postExcerpt={node.excerpt}
              postPath={node.fields.slug}
              isCurrent={state.currentIndex == index}
              onClick={() => dispatch({ type: "GOTO", index })}
            />
          ))}
        </PostListings>
      </PostCarousel>
      {/* {data.allMarkdownRemark.edges.map(({ node }, index) => ( */}
      {/* <div key={node.id}> */}
      {/* <div css={postDate}> */}
      {/* <h6>{node.frontmatter.date}</h6> */}
      {/* </div> */}
      {/* <div css={postLink}> */}
      {/* <Link to={node.fields.slug}> */}
      {/* <h1>{node.frontmatter.title}</h1> */}
      {/* TODO Only show excerpt for "selected" post */}
      {/* <p>{node.excerpt}</p> */}
      {/* </Link> */}
      {/* </div> */}
      {/* </div> */}
      {/* ))} */}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(fromNow: true)
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default IndexPage;
