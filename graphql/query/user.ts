import { graphql } from "@/gql"
export const verifyGoogleTokenQuery = graphql(`
#graphql
query VerfiyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
}`)
export const getCurrentUserQuery = graphql(`query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      lastName
      profileImageUrl
      email
      tweets{
        id
        content
        author{
          firstName
          lastName
          profileImageUrl

        }
      }
    }
  }`)

  export const getUserByIdQuery = graphql(`#graphql
  query Query($id: ID!) {
    getUserById(id: $id) {
      firstName
      lastName
      id
      profileImageUrl
      tweets {
        content
        id
        author {
          firstName
          lastName
          profileImageUrl
        }
      }
    }
  }

  `)
  