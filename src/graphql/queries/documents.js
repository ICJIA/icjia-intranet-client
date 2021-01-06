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
        published_at
        updated_at
        title
        slug
        unit {
          title
          slug
        }
        externalURL
        summary
        body
        file {
          url
          name
          ext
        }
      }
    }
  }
`;

export { GET_ALL_DOCUMENTS };
