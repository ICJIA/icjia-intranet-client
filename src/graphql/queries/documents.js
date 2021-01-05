import gql from "graphql-tag";

const GET_ALL_DOCUMENTS = gql`
  query Documents {
    documents(sort: "published_at:desc") {
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
      unit {
        title
        slug
      }
      related {
        title
        slug
        summary
      }
    }
  }
`;

export { GET_ALL_DOCUMENTS };
