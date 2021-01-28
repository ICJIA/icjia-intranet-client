import gql from "graphql-tag";

const GET_ALL_CLUSTERS = gql`
  query Clusters {
    clusters(sort: "updated_at:desc") {
      id
      title
      slug
      summary
      updated_at
      published_at
      documents(sort: "title:asc") {
        id
        title
        updated_at
        published_at
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
      updated_at
      published_at
      documents(sort: "title:asc") {
        id
        title
        updated_at
        published_at
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
