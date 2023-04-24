import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
export const QUERY_POST = gql`
  query post($_id:ID!) {
    post(_id:$_id){
      _id
      title
      createdAt
      postText
      sneakerName
      image
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getAllPosts{
      _id
      title
      sneakerName
      image
      postText
      createdAt
    }
  }
`