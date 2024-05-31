/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n#graphql\n\nmutation Mutation($payload: createTweetData!) {\n    createTweet(payload: $payload) {\n     id\n    }\n  }\n": types.MutationDocument,
    "\n#graphql\n\nquery  GetAllTweets {\ngetAllTweets {\n    id\n    content\n    imageURL\n    author {\n      firstName\n      id\n      lastName\n      prifileImageUrl\n    \n     \n    }\n  }\n}\n": types.GetAllTweetsDocument,
    "\n#graphql\nquery VerfiyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n}": types.VerfiyUserGoogleTokenDocument,
    "query GetCurrentUser {\n    getCurrentUser {\n      id\n      firstName\n      lastName\n      prifileImageUrl\n      email\n    }\n  }": types.GetCurrentUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n\nmutation Mutation($payload: createTweetData!) {\n    createTweet(payload: $payload) {\n     id\n    }\n  }\n"): (typeof documents)["\n#graphql\n\nmutation Mutation($payload: createTweetData!) {\n    createTweet(payload: $payload) {\n     id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n\nquery  GetAllTweets {\ngetAllTweets {\n    id\n    content\n    imageURL\n    author {\n      firstName\n      id\n      lastName\n      prifileImageUrl\n    \n     \n    }\n  }\n}\n"): (typeof documents)["\n#graphql\n\nquery  GetAllTweets {\ngetAllTweets {\n    id\n    content\n    imageURL\n    author {\n      firstName\n      id\n      lastName\n      prifileImageUrl\n    \n     \n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\nquery VerfiyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n}"): (typeof documents)["\n#graphql\nquery VerfiyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCurrentUser {\n    getCurrentUser {\n      id\n      firstName\n      lastName\n      prifileImageUrl\n      email\n    }\n  }"): (typeof documents)["query GetCurrentUser {\n    getCurrentUser {\n      id\n      firstName\n      lastName\n      prifileImageUrl\n      email\n    }\n  }"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;