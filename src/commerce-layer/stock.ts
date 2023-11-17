import { CommerceLayerClient, Sku } from "@commercelayer/sdk";

export async function getStock(client: CommerceLayerClient, sku: Sku) {
  try {
    const stockItems = await client.skus.stock_items(sku);
    const totalQuantity = stockItems.reduce((acc, cur) => acc + cur.quantity, 0);

    return { stockItems, totalQuantity };
  } catch (e) {
    console.log(e);
    return { stockItems: [], totalQuantity: 0 };
  }
}
