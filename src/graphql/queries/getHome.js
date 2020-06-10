import gql from "graphql-tag";

const GET_HOME_POSTS = gql`
  query getHomePosts {
    posts(where: { isPublished: true }, sort: "created_at:desc") {
      id
      title
      slug
      summary
      created_at
    }
  }
`;

export { GET_HOME_POSTS };
