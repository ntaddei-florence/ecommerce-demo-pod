import { CommerceLayerClient, Customer, LineItemCreate } from "@commercelayer/sdk";

import { getOrCreateCommerceLayerCustomer } from "./customer";

export async function getCommerceLayerCart(client: CommerceLayerClient, c?: Customer) {
  const customer = c ?? (await getOrCreateCommerceLayerCustomer(client));
  const cart = (
    await client.orders.list({
      filters: { status_in: "draft,pending", customer_email_eq: customer?.email ?? "" },
      sort: { updated_at: "desc" },
      include: ["line_items.item", "line_items.line_item_options.sku_option"],
    })
  ).first();
  return cart ?? null;
}

export async function addToCommerceLayerCart(client: CommerceLayerClient, sku: string) {
  const customer = await getOrCreateCommerceLayerCustomer(client);
  if (!customer) throw new Error("unknown customer");

  let cart = await getCommerceLayerCart(client, customer);
  if (!cart) {
    cart = await client.orders.create({
      customer_email: customer.email,
    });
  }
  const skuItem = (await client.skus.list({ filters: { code_eq: sku } }))[0];

  const newLineItem: LineItemCreate = {
    sku_code: sku,
    quantity: 1,
    _update_quantity: true,
    name: skuItem?.name,
    image_url: skuItem.image_url,
    order: cart,
  };
  await client.line_items.create(newLineItem);
}

export async function removeFromCommerceLayerCart(client: CommerceLayerClient, lineItemId: string) {
  await client.line_items.delete(lineItemId);
}
