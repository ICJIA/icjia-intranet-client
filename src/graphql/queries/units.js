import gql from "graphql-tag";

const GET_ALL_UNITS = gql`
  query {
    units(sort: "slug:asc") {
      id
      title
      slug
      shortname
      published_at
      created_at
      published_at
      summary
    }
  }
`;

const GET_SINGLE_UNIT = gql`
  query getSingleUnit($slug: String!) {
    units(where: { slug: $slug }) {
      id
      title
      summary
      slug
      shortname
      documents(sort: "updated_at:desc") {
        published_at
        updated_at
        created_at
        title
        body
        slug
        summary
        externalURL
        unit {
          title
          slug
          shortname
        }
        file {
          ext
          url
          name
        }
        clusters {
          id
          title
          slug
          summary
          documents {
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
      posts(sort: "updated_at:desc") {
        title
        slug
        summary
        published_at
        updated_at
        created_at
        splash {
          url
          formats
        }
        units {
          title
          slug
          shortname
        }
      }
    }
  }
`;

export { GET_ALL_UNITS, GET_SINGLE_UNIT };
