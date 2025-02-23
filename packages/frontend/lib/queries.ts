import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      email
      name
      createdAt
    }
  }
`;

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      name
      createdAt
    }
  }
`;
