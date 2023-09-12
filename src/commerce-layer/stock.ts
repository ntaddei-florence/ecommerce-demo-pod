import { CommerceLayerClient } from "@commercelayer/sdk";

export async function getStock(client: CommerceLayerClient, sku: string) {
  const stockItems = await client.stock_items.list({
    filters: { sku_code_eq: sku },
  });
  const totalQuantity = stockItems.reduce((acc, cur) => acc + cur.quantity, 0);

  return { stockItems, totalQuantity };
}
