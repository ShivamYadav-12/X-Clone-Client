import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
#graphql

query  GetAllTweets {
getAllTweets {
    id
    content
    imageURL
    author {
      firstName
      id
      lastName
      profileImageUrl
    
     
    }
  }
}
`)