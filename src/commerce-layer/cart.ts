import { CommerceLayerClient, Customer, LineItemCreate, Order } from "@commercelayer/sdk";
import { cookies } from "next/headers";

import { CART_ID_COOKIE_KEY } from "./constants";
import { getOrCreateCommerceLayerCustomer } from "./customer";

export async function reconcileCarts(client: CommerceLayerClient, oldCart: Order, newCart: Order) {
  if (oldCart.id === newCart.id) return;

  // merge old cart's items into new one
  oldCart.line_items?.forEach(async (lineItem) => {
    const newLineItem: LineItemCreate = {
      ...lineItem,
      order: newCart,
    };
    await client.line_items.create(newLineItem);
  });
}

export async function getCommerceLayerCart(client: CommerceLayerClient, c?: Customer | null) {
  const customer = c ?? (await getOrCreateCommerceLayerCustomer(client));
  const existingPendingCart = customer?.email
    ? (
        await client.orders.list({
          filters: { status_in: "draft,pending", customer_email_eq: customer.email },
          sort: { updated_at: "desc" },
          include: ["line_items.item", "line_items.line_item_options.sku_option"],
        })
      ).first()
    : null;

  const cartIdFromCookie = cookies().get(CART_ID_COOKIE_KEY)?.value;
  const cartFromCookie = cartIdFromCookie
    ? await client.orders.retrieve(cartIdFromCookie, {
        include: ["line_items.item", "line_items.line_item_options.sku_option"],
      })
    : null;

  // if cart has no customer_email and the user has logged
  if (cartFromCookie && existingPendingCart) {
    // if a cart existed for the same customer_email, merge it into the new one
    await reconcileCarts(client, existingPendingCart, cartFromCookie);
  }

  let cart = cartFromCookie ?? existingPendingCart;

  if (cart && !cart?.customer_email && customer?.email) {
    // update current cart email
    cart = await client.orders.update({ id: cart.id, customer_email: customer.email });
  }
  return cart ?? null;
}

export async function addToCommerceLayerCart(client: CommerceLayerClient, sku: string) {
  const customer = await getOrCreateCommerceLayerCustomer(client);

  let cart = await getCommerceLayerCart(client, customer);
  if (!cart) {
    cart = await client.orders.create({
      customer_email: customer?.email,
    });
  }

  // update cart id in cookies
  if (cookies().get(CART_ID_COOKIE_KEY)?.value !== cart.id) {
    cookies().set(CART_ID_COOKIE_KEY, cart.id);
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
