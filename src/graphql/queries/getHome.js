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
    posts {
      id
      title
      summary
    }
  }
`;

export { GET_HOME_ABOUT, GET_HOME_POSTS };
