"use client";

import { FC } from "react";

import { CartIcon } from "~/components/icons/cart";
import { formatAmountWithCurrency } from "~/utils/currency";

export interface ShoppingCartDropdownProps {
  amountInCents: number;
  currency: string;
  itemsCount: number;
}

export const ShoppingCartDropdown: FC<ShoppingCartDropdownProps> = ({
  amountInCents,
  currency,
  itemsCount,
}) => {
  const formattedAmount = formatAmountWithCurrency(amountInCents, currency);
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <CartIcon />
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">{itemsCount} items</span>
          <span className="text-info">Subtotal: {formattedAmount}</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
