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

const GET_RECENT_EVENTS = gql`
  query RecentEvents {
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

export { GET_EVENTS, GET_RECENT_EVENTS };
