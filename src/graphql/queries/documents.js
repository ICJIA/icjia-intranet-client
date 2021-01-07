import gql from "graphql-tag";

const GET_ALL_DOCUMENTS = gql`
  query Documents {
    documents(sort: "published_at:desc") {
      id
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
      clusters {
        id
        title
        summary
        documents {
          id
          title
          slug
          file {
            url
            name
            ext
          }
          summary
          externalURL
        }
      }
    }
  }
`;

export { GET_ALL_DOCUMENTS };
