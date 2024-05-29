import {graphql} from "../../gql";
export const verifyGoogleTokenQuery = graphql(`
#graphql
query VerfiyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
}`)