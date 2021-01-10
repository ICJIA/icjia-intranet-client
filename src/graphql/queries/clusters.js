import gql from "graphql-tag";

const GET_ALL_CLUSTERS = gql`
  query Clusters {
    clusters(sort: "title:asc") {
      id
      title
      slug
      summary
      documents(sort: "title:asc") {
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
`;

const GET_SINGLE_CLUSTER = gql`
  query getSingleCluster($slug: String!) {
    clusters(where: { slug: $slug }) {
      id
      title
      slug
      summary
      documents(sort: "title:asc") {
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
`;

export { GET_ALL_CLUSTERS, GET_SINGLE_CLUSTER };
