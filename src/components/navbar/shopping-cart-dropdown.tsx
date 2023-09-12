"use client";

import { Order } from "@commercelayer/sdk";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC } from "react";

import { useScrollY } from "~/hooks/use-scroll-y";

export interface ShoppingCartDropdownProps {
  cart: Order | null;
}

export const ShoppingCartDropdown: FC<ShoppingCartDropdownProps> = ({ cart }) => {
  const itemsCount = cart?.line_items?.length ?? 0;
  const scrollY = useScrollY();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <ShoppingCartIcon
            className={`h-6 w-6 ${
              scrollY > 0 ? "text-secondary" : "text-neutral"
            } transition ease-in-out duration-500`}
          />
          {itemsCount > 0 && (
            <span className="badge badge-sm bg-neutral-400 text-white indicator-item">
              {itemsCount}
            </span>
          )}
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          {itemsCount > 0 && (
            <span className="font-bold text-lg">
              {itemsCount} {itemsCount === 1 ? "item" : "items"}
            </span>
          )}
          {/* <span className="text-info"></span> */}
          <div className="card-actions">
            <Link href={"/cart"}>
              <button className="btn btn-primary btn-block">View cart</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
