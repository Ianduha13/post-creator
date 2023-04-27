import { gql } from "@apollo/client";


export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id,
    title,
    subtitle
    user {
      name
    }
    description
    }
  }`
export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
    title,
    subtitle
    user {
      name
    }
    description
    }
  }`
