import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const CREATE_POST = gql`
  mutation createPost($input: postInput){
    addToDeck(input: $input){
        cards{
          name
          text
          imageUrl
          manaCost
          supertypes
          rarity
          types
          cardCount
      }
    }
  }
`;