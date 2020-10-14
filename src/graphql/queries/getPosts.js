import gql from "graphql-tag";

const GET_ALL_POSTS_QUERY = gql`
  query getAllPosts {
    posts {
      id
      slug
      title
      summary
      showToc
      created_at
      updated_at
      updated_by {
        username
        firstname
        lastname
      }
      created_by {
        username
        firstname
        lastname
      }
      body
      splash {
        formats
      }
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
      showToc
      created_at
      updated_at
      updated_by {
        username
        firstname
        lastname
      }
      created_by {
        username
        firstname
        lastname
      }
      body
      splash {
        formats
      }
    }
  }
`;

export { GET_ALL_POSTS_QUERY, GET_SINGLE_POST_QUERY };
