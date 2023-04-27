import { gql } from "@apollo/client";


export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id,
    title,
    subtitle
    user {
      id
    }
    description
    }
  }`