import gql from "graphql-tag";

const GET_ALL_UNITS_QUERY = gql`
  query {
    units(sort: "slug:asc") {
      id
      title
      slug
      shortname
      summary
      unit_pages {
        title
        slug
        summary
      }
      documents {
        title
        summary
        externalURL
        file {
          name
          ext
          url
        }
      }
    }
  }
`;

export { GET_ALL_UNITS_QUERY };
