import { HttpLink } from "@apollo/client";

export const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL!,
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
})