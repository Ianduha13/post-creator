import { gql } from "@apollo/client";


export const ADD_POST = gql`
  mutation AddPost($title: String!, $subtitle: String!, $description: String!, $userId: ID!) {
    addPost(
      title: $title
      subtitle: $subtitle
      description: $description
      userId: $userId
    ) {
      id
      title
      subtitle
      description
      user {
        id
        name
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }

`
