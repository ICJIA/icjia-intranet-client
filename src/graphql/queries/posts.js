import gql from "graphql-tag";

const GET_ALL_POSTS_QUERY = gql`
  query getAllPosts {
    posts(sort: "published_at:desc") {
      id
      slug
      kicker
      title
      summary
      created_at
      updated_at
      published_at
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
      units {
        title
        shortname
        slug
      }
      body
      splash {
        url
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
      kicker
      created_at
      updated_at
      published_at
      units {
        title
        slug
        shortname
      }
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
      documents {
        published_at
        updated_at
        title
        summary
        externalURL
        body
        file {
          url
          name
          ext
        }
        slug
      }
      splash {
        url
        formats
      }
    }
  }
`;

export { GET_ALL_POSTS_QUERY, GET_SINGLE_POST_QUERY };
