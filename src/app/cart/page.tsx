import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

import {
  getCommerceLayerCart,
  getCommerceLayerClient,
  getSalesChannelToken,
  removeFromCommerceLayerCart,
} from "~/commerce-layer";

export default async function CartPage() {
  const clClient = await getCommerceLayerClient();
  const cart = await getCommerceLayerCart(clClient);

  async function removeFromCart(data: FormData) {
    "use server";
    const lineItemId = data.get("lineItemId") as string;
    const clClient = await getCommerceLayerClient();
    await removeFromCommerceLayerCart(clClient, lineItemId);
    revalidatePath("/");
  }

  const cartLength = cart?.line_items?.length ?? 0;

  async function handleCheckout() {
    "use server";
    const endpoint = process.env.NEXT_CL_CHECKOUT_ENDPOINT;
    const token = await getSalesChannelToken(process.env.NEXT_CL_CHECKOUT_CLIENT_ID);

    if (!cart || !endpoint || !token) return;

    const checkoutUrl = `${endpoint}/${cart.id}?accessToken=${token}`;
    redirect(checkoutUrl);
  }

  return (
    <div className="pt-8">
      <p>Your shopping cart {cartLength ? `contains ${cartLength ?? 0} items` : "is empty"}</p>

      {!!cartLength && (
        <div className="overflow-x-auto pt-6">
          <table className="table bg-neutral-100">
            {/* head */}
            <thead>
              <tr>
                {/* <th>
                  <label>
                    <input type="checkbox" className="checkbox" checked={false} />
                  </label>
                </th> */}
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart?.line_items?.map((lineItem) => {
                return (
                  <tr key={lineItem.id}>
                    {/* <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th> */}
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={lineItem.image_url ?? ""} alt={lineItem.name ?? ""} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{lineItem.name}</div>
                          <div className="text-sm opacity-50">{lineItem.sku_code}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {lineItem.formatted_total_amount}
                      <br />
                      {!!lineItem.discount_cents && (
                        <span className="badge badge-ghost badge-sm">
                          {lineItem.formatted_discount}
                        </span>
                      )}
                    </td>
                    <td>{lineItem.quantity}</td>
                    <th>
                      <form action={removeFromCart}>
                        <input hidden value={lineItem.id} name="lineItemId" readOnly />
                        <button type="submit" className="btn btn-ghost btn-xs">
                          remove
                        </button>
                      </form>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {cartLength && (
        <form action={handleCheckout} className="w-full flex justify-end mt-4">
          <button type="submit" className="btn btn-primary">
            Checkout
          </button>
        </form>
      )}
    </div>
  );
}
