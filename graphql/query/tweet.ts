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

export const getSignedURLForTweetQuery = graphql(`#graphql 
query GetSignedURL($imageName: String!, $imageType: String!) {
  getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
}
`)