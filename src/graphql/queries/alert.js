import gql from "graphql-tag";

const GET_ALERT = gql`
  query Home {
    home {
      id
      created_at
      updated_at

      alert {
        text
        alertType
        dismissable
      }
    }
  }
`;

export { GET_ALERT };
