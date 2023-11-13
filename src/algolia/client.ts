import algoliasearch from "algoliasearch";

const appId = process.env.NEXT_ALGOLIA_APP_ID!;
const apiKey = process.env.NEXT_ALGOLIA_API_KEY!;

export const searchClient = algoliasearch(appId, apiKey);
