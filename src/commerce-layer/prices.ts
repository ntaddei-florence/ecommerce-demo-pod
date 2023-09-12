import { CommerceLayerClient } from "@commercelayer/sdk";

export async function getPrice(client: CommerceLayerClient, sku: string) {
  return await client.prices.list({ filters: { sku_code_eq: sku } });
}
