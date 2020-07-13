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

    events {
      id
      name
      start
      end
      allDay
      summary
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
