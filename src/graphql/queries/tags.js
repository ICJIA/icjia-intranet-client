import gql from "graphql-tag";

const GET_ALL_TAGS = gql`
  query {
    tags(sort: "slug:asc") {
      id
      title
      slug
      created_at
      summary
    }
  }
`;

const GET_SINGLE_TAG = gql`
  query getSingleUnit($slug: String!) {
    tags(where: { slug: $slug }) {
      id
      title
      summary
      slug
      events {
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
        units {
          title
          slug
          shortname
        }
      }
    }
  }
`;

export { GET_ALL_TAGS, GET_SINGLE_TAG };
