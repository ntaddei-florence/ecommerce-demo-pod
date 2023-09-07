"use server";

import { CommerceLayerClient } from "@commercelayer/sdk";

import { getOrCreateCommerceLayerCustomer } from "./customer";

export async function getCommerceLayerCart(client: CommerceLayerClient) {
  const customer = await getOrCreateCommerceLayerCustomer(client);
  const cart = (
    await client.orders.list({
      filters: { status_eq: "draft", customer_email_eq: customer?.email ?? "" },
      sort: { updated_at: "desc" },
      include: ["line_items.item", "line_items.line_item_options.sku_option"],
    })
  ).first();
  return cart ?? null;
}
