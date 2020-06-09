import gql from "graphql-tag";

const GET_HOME_ABOUT = gql`
  query getHomeAbout {
    homeAbout {
      title
      body
    }
  }
`;

const GET_HOME_POSTS = gql`
  query getHomePosts {
    posts(where: { isPublished: true }) {
      id
      title
      summary
      createdAt
    }
  }
`;

export { GET_HOME_ABOUT, GET_HOME_POSTS };
