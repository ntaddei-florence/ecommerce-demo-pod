import { CommerceLayerClient, Customer } from "@commercelayer/sdk";

import { getOrCreateCommerceLayerCustomer } from "./customer";

export async function getCommerceLayerCart(client: CommerceLayerClient, c?: Customer) {
  const customer = c ?? (await getOrCreateCommerceLayerCustomer(client));
  const cart = (
    await client.orders.list({
      filters: { status_eq: "draft", customer_email_eq: customer?.email ?? "" },
      sort: { updated_at: "desc" },
      include: ["line_items.item", "line_items.line_item_options.sku_option"],
    })
  ).first();
  return cart ?? null;
}

// TODO check this
export async function addToCommerceLayerCart(client: CommerceLayerClient, sku: string) {
  const customer = await getOrCreateCommerceLayerCustomer(client);
  if (!customer) throw new Error("unknown customer");

  let cart = await getCommerceLayerCart(client, customer);
  if (!cart) {
    cart = await client.orders.create({
      customer_email: customer.email,
    });
  }
  const lineItem = (await client.line_items.list({ filters: { sku_code_eq: sku } }))[0];

  if (lineItem) {
    cart.line_items?.push(lineItem);
  }
}
