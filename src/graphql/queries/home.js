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
          postingDate
          summary
          image {
            formats
          }
        }
      }
    }

    eventRange: events(
      limit: $eventLimit
      where: { isPublished: true, start_lte: $now, end_gte: $now }
      sort: "start:asc"
    ) {
      id
      name
      start
      end
      timed
      summary
      details
      isPublished
      type
    }

    events(
      limit: $eventLimit
      where: { isPublished: true, start_gte: $now }
      sort: "start:asc"
    ) {
      id
      name
      start
      end
      timed
      summary
      details
      isPublished
      type
    }

    posts(
      where: { isPublished: true }
      sort: "created_at:desc"
      limit: $postLimit
    ) {
      id
      title
      slug
      summary
      created_at
      updated_at
    }
  }
`;

export { GET_HOME };
