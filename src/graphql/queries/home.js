import gql from "graphql-tag";

const GET_HOME = gql`
  query Home($start: String!, $eventLimit: Int!) {
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
      where: { isPublished: true, start_lte: $start, end_gte: $start }
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
      limit: 5
      where: { isPublished: true, start_gte: $start }
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

    posts(where: { isPublished: true }, sort: "created_at:desc", limit: 5) {
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
