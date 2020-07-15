import gql from "graphql-tag";

const GET_HOME = gql`
  query Home {
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

    events(where: { isPublished: true }, sort: "start:asc") {
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
