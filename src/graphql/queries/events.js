import gql from "graphql-tag";

const GET_EVENTS = gql`
  query Events {
    events(sort: "start:asc") {
      id
      created_at
      updated_at
      name
      start
      end
      timed
      summary
      details
    }
  }
`;

export { GET_EVENTS };
