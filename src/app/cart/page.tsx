import React from "react";

import { getCommerceLayerCart, getCommerceLayerClient } from "~/commerce-layer";

export default async function CartPage() {
  const clClient = await getCommerceLayerClient();
  const cart = await getCommerceLayerCart(clClient);

  return (
    <div>
      <p className="your-custom-class">
        Your shopping cart contains {cart?.line_items?.length ?? 0} items
      </p>

      {!!cart?.line_items?.length && (
        <div className="overflow-x-auto pt-6">
          <table className="table bg-neutral-100">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
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
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={lineItem.image_url ?? undefined} alt={lineItem.name ?? ""} />
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
                    {/* <th>
                    <button className="btn btn-ghost btn-xs">remove</button>
                  </th> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
