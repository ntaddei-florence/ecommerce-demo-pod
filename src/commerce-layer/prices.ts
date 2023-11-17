import { CommerceLayerClient, Sku } from "@commercelayer/sdk";

export async function getPrice(client: CommerceLayerClient, sku: Sku) {
  return await client.skus.prices(sku);
}
