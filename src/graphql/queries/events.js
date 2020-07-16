import gql from "graphql-tag";

const GET_EVENTS = gql`
  query Events {
    events {
      id
      created_at
      updated_at
      name
      start
      end
      timed
      summary
      details
      isPublished
    }
  }
`;

export { GET_EVENTS };
