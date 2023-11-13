import { SearchClient } from "algoliasearch";

export const getProductIndex = (client: SearchClient) => client.initIndex("dev_PRODUCT");
