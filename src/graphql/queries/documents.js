import gql from "graphql-tag";

const GET_ALL_DOCUMENTS = gql`
  query Documents {
    documents(sort: "published_at:desc") {
      published_at
      updated_at
      title
      summary
      body
      file {
        url
        name
        ext
      }
      slug
      unit {
        title
        slug
      }
    }
  }
`;

export { GET_ALL_DOCUMENTS };
