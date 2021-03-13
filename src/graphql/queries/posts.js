/* eslint-disable graphql/template-strings */
import gql from "graphql-tag";

const GET_ALL_POSTS_QUERY = gql`
  query getAllPosts {
    posts(sort: "published_at:desc") {
      id
      slug
      claps
      title
      summary
      created_at
      updated_at
      published_at
      updated_by {
        username
        firstname
        lastname
      }
      tags(sort: "title:asc") {
        id
        title
        slug
        created_at
        summary
      }
      created_by {
        username
        firstname
        lastname
      }
      units {
        title
        shortname
        slug
      }
      body
      splash {
        url
        formats
      }
    }
  }
`;

const GET_POPULAR_POSTS_QUERY = gql`
  query getPopularPosts {
    posts(limit: 5, sort: "claps:desc") {
      id
      slug
      claps
      title
      summary
      created_at
      updated_at
      published_at
      body
      splash {
        url
        formats
      }
    }
  }
`;

const GET_SINGLE_POST_QUERY = gql`
  query getSinglePost($slug: String!) {
    posts(where: { slug: $slug }) {
      id
      slug
      title
      summary
      claps
      created_at
      updated_at
      published_at

      tags(sort: "title:asc") {
        id
        title
        slug
        created_at
        summary
      }

      units {
        title
        slug
        shortname
      }

      updated_by {
        username
        firstname
        lastname
      }
      created_by {
        username
        firstname
        lastname
      }
      body
      documents {
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
      splash {
        url
        formats
      }
    }
  }
`;

export { GET_ALL_POSTS_QUERY, GET_SINGLE_POST_QUERY, GET_POPULAR_POSTS_QUERY };
