import gql from "graphql-tag";

const GET_ALL_POSTS_QUERY = gql`
  query getAllPosts {
    posts {
      id
      slug
      title
      summary
      createdAt

      body
    }
  }
`;

const GET_SINGLE_POST_QUERY = gql`
  query getSinglePost($slug: String!) {
    posts(where: { slug: $slug }) {
      id
      slug
      title
      summary
      body
    }
  }
`;

export { GET_ALL_POSTS_QUERY, GET_SINGLE_POST_QUERY };
