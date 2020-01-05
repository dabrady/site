import { css } from "@emotion/core";
import { graphql, navigate } from "gatsby";
import React, { useEffect, useReducer, useRef } from "react";
import gray from "gray-percentage";
import styled from "@emotion/styled";

import { rhythm } from "@utils/typography";
import Layout from "@components/layout";
import SEO from "@components/seo";
import useEventListener from "@utils/hooks/useEventListener";

const transitionSpeed = 0.3;
//---------
const PostCarouselStyles = css``;
function PostCarousel(props) {
  return <section css={PostCarouselStyles} {...props} />;
}

const PostListingsStyles = css`
  margin-left: 0;
  list-style-type: none;
`;
function PostListings(props) {
  return <ul css={PostListingsStyles} {...props} />;
}

const StyledDate = styled("div")`
  width: ${rhythm(3.4)};
  float: left;
  text-align: right;

  h6 {
    margin-top: ${0};
    margin-right: ${rhythm(2 / 3)};
    color: ${props => (props.selected ? gray(30, 0, true) : gray(10, 0, true))};
    transition: color ${transitionSpeed};
    font-style: italic;
  }
`;
function PostDate({ postDate, isCurrent }) {
  return (
    <StyledDate selected={isCurrent}>
      <h6>{postDate}</h6>
    </StyledDate>
  );
}

const StyledExcerpt = styled("div")`
  margin-left: ${rhythm(3.4)};
  & > h1 {
    margin-top: ${rhythm(0.5)};
    margin-bottom: ${rhythm(0)};
  }
  & > p {
    max-height: 0;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, max-height ${transitionSpeed}s ease-in,
      max-height ${transitionSpeed / 2}s ease-out,
      opacity ${transitionSpeed}s linear;
    ${props =>
      props.show &&
      css`
        max-height: ${rhythm(2)};
        visibility: visible;
        opacity: 1;
      `};
  }
`;
const StyledListing = styled("li")`
  & div:focus {
    outline: none;
  }
  ${props => props.selected && `margin-bottom: ${rhythm(1)}`}
`;
function PostListing({
  id,
  postDate,
  postTitle,
  postExcerpt,
  postPath,
  onSelect,
  isCurrent
}) {
  const listing = useRef();
  useEffect(() => {
    if (isCurrent) {
      listing.current.focus();
    }
  }, [isCurrent]);

  const handleClick = event => {
    if (isCurrent) {
      navigate(postPath);
    } else {
      onSelect(event);
    }
  };

  return (
    <StyledListing selected={isCurrent} onClick={onSelect}>
      <PostDate postDate={postDate} isCurrent={isCurrent} />
      <StyledExcerpt
        ref={listing}
        tabIndex="-1"
        show={isCurrent}
        onClick={handleClick}
        onKeyPress={e => {
          if (e.key == "Enter") navigate(postPath);
        }}
      >
        <h1 id={id}>{postTitle}</h1>
        {/* I only want the current selection to be verbose. */}
        {/* {isCurrent && <p>{postExcerpt}</p>} */}
        <p>{postExcerpt}</p>
      </StyledExcerpt>
    </StyledListing>
  );
}

//---------

const IndexPage = ({ data }) => {
  const postNodes = data.allMarkdownRemark.edges;
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "PREV":
          console.debug("previous");
          return {
            ...state,
            currentIndex: state.currentIndex == 0 ? 0 : state.currentIndex - 1
          };
        case "NEXT":
          console.debug("next");
          return {
            ...state,
            currentIndex:
              state.currentIndex == postNodes.length - 1
                ? state.currentIndex
                : state.currentIndex + 1
          };
        // TODO Make focus navigation a thing.
        case "GOTO":
          console.debug("going to " + action.index);
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
              onSelect={() => dispatch({ type: "GOTO", index })}
            />
          ))}
        </PostListings>
      </PostCarousel>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: ASC }) {
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
