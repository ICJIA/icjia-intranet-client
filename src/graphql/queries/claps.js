import gql from "graphql-tag";

const GET_TOP_CLAPS = gql`
  query TopClaps {
    claps(sort: "claps:desc", limit: 5, where: { localhost: false }) {
      id
      claps
      pagePath
    }
  }
`;

export { GET_TOP_CLAPS };
