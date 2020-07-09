import gql from "graphql-tag";

const GET_HOME = gql`
  query Home {
    home {
      id
      created_at
      updated_at

      alert {
        id
        text
      }

      quick_menu {
        title
        summary
        menuItem {
          text
          url
        }
      }

      slider {
        slide {
          title
          url
          image {
            formats
          }
        }
      }
    }
  }
`;

export { GET_HOME };
