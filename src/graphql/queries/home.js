import gql from "graphql-tag";

const GET_HOME = gql`
  query Home {
    home {
      id
      created_at
      updated_at

      alert {
        text
        alertType
        dismissable
      }

      quick_menu {
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
    }

    posts(where: { isPublished: true }, sort: "created_at:desc", limit: 5) {
      id
      title
      slug
      summary
      created_at
    }
  }
`;

export { GET_HOME };
