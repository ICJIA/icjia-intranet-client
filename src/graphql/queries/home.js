import gql from "graphql-tag";

const GET_HOME = gql`
  query Home($now: String!, $eventLimit: Int!, $postLimit: Int!) {
    home {
      id
      created_at
      updated_at

      # quick_menu {
      #   id
      #   title
      #   summary

      #   menuItem {
      #     text
      #     url
      #   }
      # }

      slider {
        id

        slide {
          title
          url
          summary
          image {
            url
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
      published_at
      name
      start
      end
      timed
      summary
      details
      slug

      type
    }

    events(limit: $eventLimit, where: { start_gte: $now }, sort: "start:asc") {
      id
      name
      start
      end
      published_at
      timed
      summary
      details
      slug

      type
    }

    posts(sort: "published_at:desc", limit: $postLimit) {
      id
      title
      kicker
      slug
      summary
      body
      created_at
      updated_at
      published_at
      units {
        title
        slug
      }
      splash {
        url
        formats
      }
    }
  }
`;

export { GET_HOME };
