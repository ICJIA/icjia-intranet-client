/* eslint-disable graphql/template-strings */
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
  query getSingleTag($slug: String!, $now: String!) {
    tags(where: { slug: $slug }) {
      id
      title
      summary
      slug
      events(where: { start_gte: $now }, sort: "start:asc") {
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
        tags {
          id
          title
          slug
        }
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
      }
      posts(sort: "updated_at:desc") {
        title
        slug
        summary
        published_at
        updated_at
        created_at
        tags(sort: "title:asc") {
          id
          title
          slug
          created_at
          summary
        }
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

export { GET_ALL_TAGS, GET_SINGLE_TAG };
