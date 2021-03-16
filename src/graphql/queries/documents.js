import gql from "graphql-tag";

const GET_ALL_DOCUMENTS = gql`
  query Documents {
    documents(sort: "updated_at:desc") {
      id
      published_at
      updated_at
      title
      summary
      externalURL
      body
      tags {
        id
        title
        slug
      }
      file {
        url
        name
        ext
      }
      slug
      unit {
        title
        slug
        shortname
      }
    }
  }
`;

const GET_SINGLE_DOCUMENT = gql`
  query getSingleDocument($slug: String!) {
    documents(where: { slug: $slug }) {
      id
      published_at
      updated_at
      title
      summary
      externalURL
      body
      tags {
        id
        title
        slug
      }
      file {
        url
        name
        ext
      }
      slug
      unit {
        title
        slug
        shortname
      }
    }
  }
`;

export { GET_ALL_DOCUMENTS, GET_SINGLE_DOCUMENT };
