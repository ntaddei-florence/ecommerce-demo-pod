"use client";

import { Order } from "@commercelayer/sdk";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

import { useScrollY } from "~/hooks/use-scroll-y";
import { useClientI18n } from "~/i18n/hooks";

export interface ShoppingCartDropdownProps {
  cart: Order | null;
}

export const ShoppingCartDropdown: FC<ShoppingCartDropdownProps> = ({ cart }) => {
  const itemsCount = cart?.line_items?.length ?? 0;
  const scrollY = useScrollY();
  const { t, localizedRoute } = useClientI18n();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <ShoppingCartIcon
            width={28}
            className={clsx(
              "transition ease-in-out duration-500",
              scrollY > 0 ? "text-secondary" : "text-neutral"
            )}
          />
          {itemsCount > 0 && (
            <span className="indicator-item badge badge-sm badge-primary">{itemsCount}</span>
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
            <Link href={localizedRoute("/cart")}>
              <button className="btn btn-primary btn-block">{t("cart.viewCart")}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
