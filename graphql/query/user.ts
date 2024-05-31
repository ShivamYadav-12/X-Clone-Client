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
      prifileImageUrl
      email
    }
  }`)
  