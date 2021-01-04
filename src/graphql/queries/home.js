import gql from "graphql-tag";

const GET_HOME = gql`
  query Home($now: String!, $eventLimit: Int!, $postLimit: Int!) {
    home {
      id
      created_at
      updated_at

      quick_menu {
        id
        title
        summary
        baseName
        baseURL
        menuItem {
          text
          url
        }
      }

      slider {
        id
        slide {
          title
          url

          summary
          image {
            formats
          }
        }
      }
    }

    eventRange: events(
      limit: $eventLimit
      where: { start_lte: $now, end_gte: $now }
      sort: "start:asc"
    ) {
      id
      name
      start
      end
      timed
      summary
      details

      type
    }

    events(limit: $eventLimit, where: { start_gte: $now }, sort: "start:asc") {
      id
      name
      start
      end
      timed
      summary
      details

      type
    }

    posts(sort: "created_at:desc", limit: $postLimit) {
      id
      title
      kicker
      slug
      summary
      body
      created_at
      updated_at
      splash {
        formats
      }
    }
  }
`;

export { GET_HOME };
