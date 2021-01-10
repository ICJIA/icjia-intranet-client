import gql from "graphql-tag";

const GET_EVENTS = gql`
  query Events {
    events(sort: "start:asc") {
      id
      created_at
      updated_at
      published_at
      name
      start
      end
      timed
      summary
      type
      slug
      details
      documents {
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
      }
    }
  }
`;

const GET_SINGLE_EVENT = gql`
  query singleEvent($slug: String!) {
    events(where: { slug: $slug }) {
      id
      created_at
      updated_at
      published_at
      name
      start
      end
      timed
      summary
      type
      slug
      details
      documents {
        id
        published_at
        updated_at
        title
        externalURL
        file {
          url
          name
          ext
        }
        slug
      }
    }
  }
`;

export { GET_EVENTS, GET_SINGLE_EVENT };
